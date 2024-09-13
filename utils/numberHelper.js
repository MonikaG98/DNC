async function getNumberId(page, number) {

    const response = await page.request.get('https://admin-dt.convoso.com/api/dnc/search', {
        headers: {
            'Authorization': `Bearer ${page.context().storageState().authToken}`
        }
    });
    const data = await response.json();
    const foundNumber = data.find(item => item.number === `+1${number}`);
    return foundNumber ? foundNumber.id : null;
}

module.exports = { getNumberId };