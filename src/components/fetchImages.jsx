function fetchImages(name, page) {
  return (
    fetch(
      `https://pixabay.com/api/?q=${name}&page=${page}&key=21675881-9f2314d809854342b3af65054&image_type=photo&orientation=horizontal&per_page=12`
    )
      /* .then(res => res.json()) */
      .then(response => {
        return response.json();
      })
      .then(data => {
        if (data.total === 0) {
          return Promise.reject(new Error(`no image with name ${name}`));
        } else {
          return data;
        }
      })
  );
}

export default fetchImages;
