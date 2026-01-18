const API_KEY = '359d14c1d96797265357f7b1fb3f727f';

exports.handler = async (event) => {
    const category = event.queryStringParameters?.category || 'general';
    
    try {
        const response = await fetch(
            `https://gnews.io/api/v4/top-headlines?category=${category}&lang=en&country=us&max=10&apikey=${API_KEY}`
        );
        
        const data = await response.json();
        
        return {
            statusCode: 200,
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            body: JSON.stringify(data)
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ error: 'Failed to fetch news' })
        };
    }
};
