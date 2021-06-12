import React, { useState } from 'react';
import alanBtn from '@alan-ai/alan-sdk-web'
import { useForm } from 'react-hook-form';
import { createLogEntry } from './API';
import './landing.css'
import styled from 'styled-components';
import {useSpring, animated, config} from 'react-spring';


const Form = styled.form`
    display: inline-block;
    padding: 3em;
    background: #C7D2FE66;
    text-align: center;
    margin-top: 25px;
    margin-bottom: 25px;
    margin-left:200px;
    align-items:center;
    font-family: "Roboto";
    justify-content: center;
    border-radius: 10px;
    z-indez: 1;
    position: relative;
    backdrop-filter: blur(7px);
    border: 2px solid transparent;
    background-clip: border-box;
    cursor: pointer;
`;

const LogEntryForm = ({ location, onClose }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { register, handleSubmit } = useForm();

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      data.latitude = location.latitude;
      data.longitude = location.longitude;
      const created=await createLogEntry(data);
      onClose();
    } catch (error) {
      console.error(error);
      setError(error.message);
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="entry-form">
      { error ? <h3 className="error">{error}</h3> : null}
      <label htmlFor="apiKey">API KEY</label>
      <input type="password" name="apiKey" {...register("apiKey")} required  />
      <label htmlFor="title">Title</label>
      <input name="title" {...register("title")} required  />
      <label htmlFor="comments">Comments</label>
      <textarea name="comments" rows={3} {...register("comments")} ></textarea>
      <label htmlFor="description">Description</label>
      <textarea name="description" rows={3} {...register("description")}></textarea>
      <label htmlFor="image">Image</label>
      <input name="image"  {...register("image")}/>
      <label htmlFor="rating">Rating</label>
      <input name="rating"  {...register("rating")}/>
      <label htmlFor="visitDate">Visit Date</label>
      <input name="visitDate" type="date" {...register("visitDate")} required />
      <button className="button" disabled={loading}>{loading ? 'Loading...' : 'Create Entry'}</button>
    </form>
  );
};

export default LogEntryForm;