import React from 'react';
import { ReactComponent as Pencil } from '../assets/icons/pencil.svg';
import { ReactComponent as Camera } from '../assets/icons/camera.svg';
import { ReactComponent as Gallery } from '../assets/icons/gallery.svg';
import { ReactComponent as Chat } from '../assets/icons/chat.svg';
import { ReactComponent as Home } from '../assets/icons/home.svg';
import { ReactComponent as Location } from '../assets/icons/location.svg';
import { ReactComponent as Gotchu } from '../assets/icons/gotchu.svg';
import { ReactComponent as Search } from '../assets/icons/search.svg';
import { ReactComponent as Spy } from '../assets/icons/spy.svg';
import { ReactComponent as Close } from '../assets/icons/close.svg';
import { ReactComponent as SoundActive } from '../assets/icons/soundActive.svg';
import { ReactComponent as SoundInactive } from '../assets/icons/soundInactive.svg';
import { ReactComponent as Play } from '../assets/icons/play.svg';
import { ReactComponent as Video } from '../assets/icons/video.svg';
import { ReactComponent as Check } from '../assets/icons/check.svg';
import { ReactComponent as Next } from '../assets/icons/next.svg';
import { ReactComponent as Back } from '../assets/icons/back.svg';
import { ReactComponent as Group } from '../assets/icons/group.svg';
import { ReactComponent as Star } from '../assets/icons/star.svg';
import { ReactComponent as MediumStar } from '../assets/icons/mediumStar.svg';
import { ReactComponent as InactiveStar } from '../assets/icons/inactiveStar.svg';
import { ReactComponent as User } from '../assets/icons/user.svg';
import { ReactComponent as Coin } from '../assets/icons/coin.svg';
import { ReactComponent as Money } from '../assets/icons/money.svg';
import { ReactComponent as Xp } from '../assets/icons/xp.svg';
import { ReactComponent as Applicants } from '../assets/icons/applicants.svg';
import { ReactComponent as Postulates } from '../assets/icons/postulates.svg';
import { ReactComponent as WrongUser } from '../assets/icons/wrongUser.svg';
import { ReactComponent as Mail } from '../assets/icons/mail.svg';
import { ReactComponent as Exit } from '../assets/icons/exit.svg';
import { ReactComponent as MenuPoints } from '../assets/icons/threepoints.svg';
import { ReactComponent as GCoin } from '../assets/icons/gCoin.svg';
import { ReactComponent as Reward } from '../assets/icons/reward.svg';
import { ReactComponent as Mxn } from '../assets/icons/mxn.svg';
import { ReactComponent as Heart } from '../assets/icons/heart.svg';
import { ReactComponent as Hand } from '../assets/icons/hand.svg';
import { ReactComponent as Comment } from '../assets/icons/comment.svg';
import { ReactComponent as CameraPhoto } from '../assets/icons/cameraPhoto.svg';
import { ReactComponent as CrossDelete } from '../assets/icons/crossDelete.svg';
import { ReactComponent as Send } from '../assets/icons/send.svg';
import { ReactComponent as AddGroup } from '../assets/icons/addGroup.svg';
import { ReactComponent as Down } from '../assets/icons/down.svg';

const dimensions = { height: "100%", width: "100%" };

export default function Icon({ name = 'pencil', size = 30, style = {}, color = '#000' }) {

    const icons = {
        pencil: <Pencil {...dimensions} fill={color} />,
        camera: <Camera {...dimensions} fill={color} />,
        gallery: <Gallery {...dimensions} fill={color} />,
        home: <Home {...dimensions} fill={color} />,
        search: <Search {...dimensions} fill={color} />,
        location: <Location {...dimensions} fill={color} />,
        gotchu: <Gotchu {...dimensions} fill={color} />,
        chat: <Chat {...dimensions} fill={color} />,
        spy: <Spy {...dimensions} fill={color} />,
        close: <Close {...dimensions} fill={color} />,
        soundActive: <SoundActive {...dimensions} fill={color} />,
        soundInactive: <SoundInactive {...dimensions} fill={color} />,
        play: <Play {...dimensions} fill={color} />,
        video: <Video {...dimensions} fill={color} />,
        check: <Check {...dimensions} fill={color} />,
        next: <Next {...dimensions} fill={color} />,
        back: <Back {...dimensions} fill={color} />,
        group: <Group {...dimensions} fill={color} />,
        star: <Star {...dimensions} fill={color} />,
        mediumStar: <MediumStar {...dimensions} fill={color} />,
        inactiveStar: <InactiveStar {...dimensions} fill={color} />,
        user: <User {...dimensions} fill={color} />,
        coin: <Coin {...dimensions} fill={color} />,
        money: <Money {...dimensions} fill={color} />,
        xp: <Xp {...dimensions} fill={color} />,
        applicants: <Applicants {...dimensions} fill={color} />,
        postulates: <Postulates {...dimensions} fill={color} />,
        wrongUser: <WrongUser {...dimensions} fill={color} />,
        mail: <Mail {...dimensions} fill={color} />,
        exit: <Exit {...dimensions} fill={color} />,
        menuPoints: <MenuPoints {...dimensions} fill={color} />,
        gCoin: <GCoin {...dimensions} fill={color} />,
        reward: <Reward {...dimensions} fill={color} />,
        mxn: <Mxn {...dimensions} fill={color} />,
        heart: <Heart {...dimensions} fill={color} />,
        hand: <Hand {...dimensions} fill={color} />,
        comment: <Comment {...dimensions} fill={color} />,
        cameraPhoto: <CameraPhoto {...dimensions} fill={color} />,
        crossDelete: <CrossDelete {...dimensions} fill={color} />,
        send: <Send {...dimensions} fill={color} />,
        addGroup: <AddGroup {...dimensions} fill={color} />,
        down: <Down {...dimensions} fill={color} />,

    }
    return (
        <div className={style}>
            {icons[name]}
        </div>
    )
}
