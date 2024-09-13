async function deleteNumberViaAPI(page, numberId) {
    const response = await page.request.delete(`https://admin-dt.convoso.com/api/dnc/${numberId}/delete?id=${numberId}`, {
        headers: {
            'Authorization': Bearer `${page.context().storageState().authToken}`
        }
    });
    if (response.ok()) {
        console.log(`Number ${numberId} deleted successfully`);
    } else {
        console.error(`Failed to delete number ${numberId}:`, response.status());
    }
}

module.exports = { deleteNumberViaAPI };
