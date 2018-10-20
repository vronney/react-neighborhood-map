class Helper {
    static baseURL() {
        return "https://api.foursquare.com/v2";
    }
    static auth() {
        const keys = {
            client_id: "1YGG0W2AHG3BWHL1CKC0ZN5TOEMSXGJSEZ4QQXC2WC5XB3EA",
            client_secret: "LK3GPKNUEPGIYKG540ZHQ0BDDSK1NYMVMAEJLNCVAVBGNJDZ",
            v: "20181029"
        };
        return Object.keys(keys).map(key => `${key}=${keys[key]}`).join("&");
    }
    static urlBuilder(urlPrams) {
        if (!urlPrams) {
            return "";
        }
        return Object.keys(this.urlPrams).map(key => `${key}=${urlPrams[key]}`).join("&");
    }
    static headers() {
        return {
            Accept: "application/json"
        };
    }
    static simpleFetch(endPoint, method, urlPrams) {
        const requestData = {
            method,
            headers: Helper.headers()
        };
        return fetch(
            `${Helper.baseURL()}${endPoint}?${Helper.auth()}&${Helper.urlBuilder(urlPrams)}`,
            requestData
        ).then(res => res.json());
    }
}

export default class SquareApi {
    static search(urlPrams) {
        return Helper.simpleFetch("/venues/search", "GET", urlPrams);
    }
    static getVenueDetails(Venue_ID) {
        return Helper.simpleFetch(`/venues/${Venue_ID}`, "GET");
    }
    static getVenuePhotos(Venue_ID) {
        return Helper.simpleFetch(`/venues/${Venue_ID}/photos`,"GET");
    }
}