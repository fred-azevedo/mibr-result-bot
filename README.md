# MIBR Result BOT
Um Bot de Twitter que busca resultados de partidas de CS:GO da MIBR. Os resultados são tuitados na conta [@MIBRGanha](https://twitter.com/MIBRGanha) em tempo real.

Tweets que (talvez) podem entrar pra história do time.

## Under the Hood

O Bot é executado como uma Função Lambda da AWS invocada a cada [X] minutos com CloudWatch. O Bot busca por novos resultados e, se existirem, posta no Twitter.

- Node.js v12
- Serverless Framework
- AWS Lambda Function
- AWS DynamoDB
- [`twitter-lite`](https://www.npmjs.com/package/twitter-lite) para postar os Tweets
- [`cheerio`](https://www.npmjs.com/package/cheerio) e [`got`](https://www.npmjs.com/package/got) para fazer web scraping

