const KEY = '24761212-f6a43eb974ac25be5c538333c';

function fetchPictures(query, page = 1) {
  return fetch(
    `https://pixabay.com/api/?q=${query}&page=${page}&key=${KEY}&image_type=photo&orientation=horizontal&per_page=12`
  ).then(response => {
    if (response.ok) {
      return response.json();
    }

    return Promise.reject(new Error(`No images were found for the ${query}`));
  });
}

const pictureAPI = {
  fetchPictures,
};

export default pictureAPI;
