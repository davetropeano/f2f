async function main(params) {
    const LanguageTranslatorV3 = require('ibm-watson/language-translator/v3');
    const { IamAuthenticator } = require('ibm-watson/auth');

    const languageTranslator = new LanguageTranslatorV3({
        version: '2018-05-01',
        authenticator: new IamAuthenticator({
        apikey: process.env.LANGUAGE_TRANSLATOR_IAM_APIKEY
    }),
    serviceUrl: process.env.LANGUAGE_TRANSLATOR_URL,
    });

    const translateParams = {
    text: params.input || 'Hello, world',
    modelId: 'en-es',
    };

    let obj = {};

    await languageTranslator.translate(translateParams)
    .then(translationResult => {
        obj = translationResult;
    })
    .catch(err => {
        console.log('error:', err);
    });

    return {
        statusCode: 200,
        headers: {
            'Content-Type': 'application/json',
        },
        body: obj.result
    }
}

module.exports.main = main;
