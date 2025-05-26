import search from "google-image-sr";

async function GetSearchListArray(query) {
    try {
        const response = await search(query);
        return response;
    } catch (error) {
        throw new Error(`Failed to fetch search results: ${error.message}`);
    }
}

export default GetSearchListArray;