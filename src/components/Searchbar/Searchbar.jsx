import { useState } from 'react';
import { toast } from 'react-toastify';
import { ReactComponent as SearchIcon } from '../icons/search.svg';
import {
  Searchbarr,
  SearchForm,
  SearchFormButton,
  SearchFormButtonLabel,
  SearchFormInput,
} from './Searchbar.styled';
import PropTypes from 'prop-types';

export default function Searchbar({ qwe }) {
  const [photoName, setPhotoName] = useState('');

  const handleNameChange = e => {
    setPhotoName(e.currentTarget.value.toLowerCase());
  };

  const handleSubmit = e => {
    e.preventDefault();

    const submitValue = e.target[1].value;
    console.log(e.target[1]);

    if (submitValue.trim() === '') {
      return toast('Write the text pls');
    }

    qwe(submitValue);
    setPhotoName('');
  };

  return (
    <Searchbarr>
      <SearchForm onSubmit={handleSubmit}>
        <SearchFormButton type="submit">
          <SearchIcon width={40} height={40} />
          <SearchFormButtonLabel></SearchFormButtonLabel>
        </SearchFormButton>

        <SearchFormInput
          type="text"
          value={photoName}
          onChange={handleNameChange}
          autocomplete="off"
          autoFocus
          placeholder="Search images and photos"
        />
      </SearchForm>
    </Searchbarr>
  );
}

Searchbar.propTypes = {
  onSubmit: PropTypes.string,
  handleSubmit: PropTypes.func,
  handleNameChange: PropTypes.func,
};
