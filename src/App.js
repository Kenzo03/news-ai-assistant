import React, {useState,useEffect} from 'react';
import alanBtn from "@alan-ai/alan-sdk-web";
import NewsCards from './components/NewsCards/NewsCards';
import wordsToNumbers from 'words-to-numbers';
import useStyles from './style.js';

const alanKey = '992a7a34b1841f848013ff844cce97ad2e956eca572e1d8b807a3e2338fdd0dc/stage';

const App = () =>{
    const classes = useStyles();
    const [newsArticles,setNewsArticles] = useState([]);
    const [activeArticle, setActiveArticle] = useState(-1);

    useEffect(()=>{
        alanBtn({
            key: alanKey,
            onCommand: ({ command,articles,number }) => {
                if(command === 'newHeadlines'){
                    setNewsArticles(articles);
                    setActiveArticle(-1);
                } else if(command === 'highlight'){
                    setActiveArticle((prevActiveArticle)=>prevActiveArticle + 1);
                } else if(command === 'open'){
                    const parsedNumber = number.length > 2 ? wordsToNumbers(number, {fuzzy:true}) : number;
                    const article = articles[parsedNumber - 1];

                    if(parsedNumber > 20){
                        alanBtn().playText('Please try again.');
                    } else if(article){
                        window.open(article.url,'_blank');
                        alanBtn().playText('Opening');
                    }
                }
            }
        })
    },[])

    return(
        <div>
            <div className={classes.logoContainer}>
                <img src="https://alan.app/voice/images/previews/preview.jpg" className={classes.alanLogo} alt="logo" />
            </div>
            <NewsCards articles={newsArticles} activeArticle={activeArticle}/>
        </div>
    );
}

export default App;