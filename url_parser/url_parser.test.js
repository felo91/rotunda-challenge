const parser = require('./url_parser');

describe('url parser', () => {
    it('should return an object', () => {
        const urlFormat = '/:version/api/:collection/:id';
        const url = '/6/api/listings/3?sort=desc&limit=10';
        const result = parser(urlFormat, url);
        expect(result).toEqual({
            version: '6',
            collection: 'listings',
            id: '3',
            sort: 'desc',
            limit: '10'
        });
    });
    it('should throw an error if it is a bad formed request', async () => {
        const urlFormat = '/:version/api/:collection/';
        const url = '/6/api/';
        expect(()=>parser(urlFormat, url)).toThrow('URL format and URL values do not match');
    });
});