import { Link, useLocation } from 'react-router-dom';
import styles from './Breadcrumb.module.css';

export default function Breadcrumb() {
    const location = useLocation();

    let currentLink = '';

    const crumbs = location.pathname.split('/').filter(crumb => crumb !== '');

    const crumbsDecoded = crumbs.map(crumb => decodeURI(crumb));

    function firstLetterUppercase(phrase) {
        return phrase.charAt(0).toUpperCase() + phrase.slice(1);
    }

    return (
        <div className={styles.container}>
            <div className={`${styles.wrapper} container`}>
                {crumbsDecoded.map(crumb => {
                    currentLink += `/${crumb}`;

                    return (
                        <div className={`${styles.crumb}`} key={crumb}>
                            <Link to={currentLink}>
                                {firstLetterUppercase(crumb)}
                            </Link>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
