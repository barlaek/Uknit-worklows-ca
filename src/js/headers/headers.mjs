
// login body
export function createBody(values) {
    const Body = {
        method: 'POST',
        body: JSON.stringify({ ...values }),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        },
    }
    return Body;
}