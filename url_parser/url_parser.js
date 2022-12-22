/*URL Parser Exercise
We need some logic that extracts the variable parts of a url into a hash. The keys of the
extract hash will be the "names" of the variable parts of a url, and the values of the hash
will be the values. We will be supplied with:

1. A url format string, which describes the format of a url. A url format string can
contain constant parts and variable parts, in any order, where "parts" of a url are
separated with "/". All variable parts begin with a colon. Here is an example of
such a url format string:

'/:version/api/:collection/:id'

2. A particular url instance that is guaranteed to have the format given by the url
format string. It may also contain url parameters. For example, given the example
url format string above, the url instance might be:

'/6/api/listings/3?sort=desc&limit=10'

Given this example url format string and url instance, the hash we want that maps all
the variable parts of the url instance to their values would look like this:

{
version: 6,
collection: 'listings',
id: 3,
sort: 'desc',
limit: 10
}
*/

const parser = (urlFormat, url) => {

    const urlValues = url.split('?')[0];
    const urlParams = url.split('?')[1];

    const urlObject = paramsParser(urlFormat, urlValues);
    const urlParamsObject = queryParser(urlParams);

    return {...urlObject, ...urlParamsObject};
}

const paramsParser = (urlFormat, urlValues) => {

    const urlArray = urlValues.split("/");
    const urlFormatArray = urlFormat.split("/");

    if (urlArray.length !== urlFormatArray.length) throw new Error('URL format and URL values do not match');

    const urlObject = {};
    urlFormatArray.forEach((element, index) => {
        if (element[0] === ":") {
            urlObject[element.slice(1)] = urlArray[index];
        }
    });

    return urlObject;
}

const queryParser = (urlParams) => {

    const urlParamsArray = urlParams ? urlParams.split('&') : [];

    const urlQueryObject = urlParamsArray.reduce((accumulator, param) => {
        const [key, value] = param.split('=');
        accumulator[key] = value;
        return accumulator;
    }, {});
    
    return urlQueryObject;
}

module.exports = parser;