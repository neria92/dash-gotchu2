import { useState } from 'react';
import algoliasearch from 'algoliasearch/lite';
import { db } from '../firebase/firebaseConfig';
import { useSelector } from 'react-redux';

const APPLICATION_ID = 'CEUSF998UJ';
const SEARCH_API_KEY = 'f071b6e6aacaa24832116475c0f8a53a';
const ALGOLIA_INDEX = 'gotchu_missions';

const client = algoliasearch(APPLICATION_ID, SEARCH_API_KEY);
const index = client.initIndex(ALGOLIA_INDEX);

export const useSearchMissions = () => {

    const [missions, setMissions] = useState([]);
    const [typingTimeout, setTypingTimeout] = useState(0);
    const [isLoading, setIsLoading] = useState(false);

    const { userId } = useSelector(state => state.auth);

    const searchMissions = (value) => {
        value = value.trim();
        if (value.length < 2) {
            setMissions([]);
            return;
        }
        if (typingTimeout) clearTimeout(typingTimeout);

        setTypingTimeout(
            setTimeout(async () => {
                setIsLoading(true);
                const { hits } = await index.search(value, {
                    hitsPerPage: 10
                });

                // Extraemos las rutas de las misiones que coincidan en la busqueda
                const paths = hits.map(hit => hit.path);

                // Mandamos a traer de Firestore todas las misiones
                let missions = await Promise.all(paths.map(path => db.doc(path).get().then(doc => ({ mission: doc.data(), id: doc.id }))));

                // Filtramos las misiones para mostrar solo aquellas que esten disponibles para este usuario
                missions = missions.filter(({ mission: { hide, missionData: { endDate }, isPrivate, fellows } }) => {
                    if (hide) return false;
                    if (endDate) {
                        const now = new Date();
                        endDate = new Date(endDate.seconds * 1000);
                        if (endDate < now) return false;
                    }
                    if (isPrivate) {
                        if (fellows) {
                            fellows = Object.keys(fellows);
                            return fellows.includes(userId);
                        } else {
                            return false;
                        }
                    }
                    return true;
                });
                setMissions(missions);
                setIsLoading(false)
            }, 500)
        );
    };

    return [missions, searchMissions, isLoading];
}