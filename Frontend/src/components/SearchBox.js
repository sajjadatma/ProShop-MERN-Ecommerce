
import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useHistory } from "react-router-dom";
const SearchBox = () => {
    const history = useHistory()
  const [keyword, setKeyword] = useState('');
  const SubmitHandler = (e)=>{
    e.preventDefault()
    if (keyword.trim()) {
        history.push(`/search/${keyword}`)
    }else{
        history.push('/')
    }
  }
  return (
    <Form onSubmit={SubmitHandler} inline>
      <Form.Control
        type='text'
        name='q'
        onChange={(e) => setKeyword(e.target.value)}
        placeholder="Search Products..."
        className="mr-sm-2 ml-sm-5"
      ></Form.Control>
      <Button type="submit" varient = 'outline-success' className='p-2'>
          Search
      </Button>
    </Form>
  );
};

export default SearchBox;
