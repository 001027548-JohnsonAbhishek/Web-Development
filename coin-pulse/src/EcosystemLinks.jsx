import React from 'react';
import './public/ecosystem-links.css'

export default function EcosystemLinks({coin}) {

    return (
        <div>
             <div className="coin-ecosystem-links">
                <h3>Coin Ecosystem Links</h3>
                <p>
                    <a className="links" href={coin.links.homepage[0]} target="_blank">HomePage</a>
                    <a className="links" href={coin.links.blockchain_site[0]} target="_blank">Block Explorer</a>
                    <a className="links" href={"https://twitter.com/"+coin.links.twitter_screen_name} target="_blank">Twitter</a>
                    <a className="links" href={coin.links.repos_url.github[0]} target="_blank">Github</a>
                </p>
            </div>
        </div>
    )
}
