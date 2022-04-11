import { useState } from 'react'
import algoliasearch from 'algoliasearch/lite'

const APPLICATION_ID = 'CEUSF998UJ'
const SEARCH_API_KEY = 'db27605ebc24344485b434972434d635'
const ALGOLIA_INDEX = 'gotchu_users2'


const client = algoliasearch(APPLICATION_ID, SEARCH_API_KEY)
const index = client.initIndex(ALGOLIA_INDEX)

export const useSearchUsers = () => {

    const [users, setUsers] = useState([]);
    const [typingTimeout, setTypingTimeout] = useState(0);
    const [isLoading, setIsLoading] = useState(false);

    const searchUsers = async (value) => {
        setIsLoading(true)
        value = value.trim();
        if (value.length < 2) {
            setUsers([]);
            setIsLoading(false)
            return;
        }
        if (typingTimeout) clearTimeout(typingTimeout);
        setTypingTimeout(
            setTimeout(async () => {
                const { hits } = await index.search(value, {
                    hitsPerPage: 5
                });
                let results = hits.map(hit => {
                    const {
                        ['userData.username']: username,
                        ['userData.email']: email,
                        ['userData.photo']: photo,
                        ['userData.stats']: stats,
                        objectID: userId
                    } = hit;
                    return { username, email, photo, stats, userId };
                })
                setUsers(results)
                setIsLoading(false)
            }, 500)
        )
    };

    return [users, searchUsers, isLoading];

}