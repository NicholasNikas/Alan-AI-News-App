import React, { useEffect, useState } from 'react';
import alanBtn from '@alan-ai/alan-sdk-web';
import wordsToNumbers from 'words-to-numbers';

import NewsCards from './components/NewsCards/NewsCards';
import useStyles from './styles.js';

const alanKey =
  'ed13544f1ce3214e81c2608d1e8f54142e956eca572e1d8b807a3e2338fdd0dc/stage';

const App = () => {
  const [newsArticles, setNewsArticles] = useState([]);
  const [activeArticle, setActiveArticle] = useState(-1);
  const classes = useStyles();

  useEffect(() => {
    alanBtn({
      key: alanKey,
      onCommand: ({ command, articles, number }) => {
        switch (command) {
          case 'newsHeadlines':
            setNewsArticles(articles);
            setActiveArticle(-1);
            break;
          case 'highlight':
            setActiveArticle((prevActiveArticle) => prevActiveArticle + 1);
            break;
          case 'open':
            const parsedNumber =
              number.length > 2
                ? wordsToNumbers(number, { fuzzy: true })
                : number;
            const article = articles[parsedNumber - 1];
            if (parsedNumber > 20) {
              alanBtn().playText('Please try that again.');
            } else if (article) {
              window.open(articles[number - 1].url, '_blank');
            }
            break;
        }
      },
    });
  }, []);

  return (
    <div>
      <div className={classes.logoContainer}>
        <img
          src='https://alan.app/voice/images/previews/preview.jpg'
          className={classes.logoContainer}
        />
      </div>
      <NewsCards articles={newsArticles} activeArticle={activeArticle} />
    </div>
  );
};

export default App;
