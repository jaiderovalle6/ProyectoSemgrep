import { useState, useEffect } from 'react'
import heroImg from './assets/hero.png'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import axios from 'axios';
import './App.css'
import { useEffectEvent } from 'react';

const API = 'http://localhost:3000/api/tareas';



function App() {
  const [count, setCount] = useState(0);
  const [tareas, setTareas] = useState([]);
  const [nombreFront, setNombreFront] = useState("");

  const obtenerTareas = async () => {
    const respuesta = await axios.get(API);
    setTareas(respuesta.data);
  };

  useEffect(() => {
    obtenerTareas();
  }, []);

  const agregarTarea = async (e) => {
    e.preventDefault();

    if (!nombreFront.trim()) {
      return;
    }

    try {
      await axios.post(`${API}/new`, {
        nombre_mio: nombreFront
      });

      setNombreFront('');
      obtenerTareas();
    } catch (error) {
      console.error('Error al agregar la tarea:', error);
    }
  };

  const eliminarTarea = async (id) => {
    try {
      await axios.delete(`${ API }/${ id }`);
      obtenerTareas();
    } catch (error) {
      console.error('Error al eliminar la tarea:', error);
    }
  };

  return (
    <>
      <section id="center">
        <form onSubmit={agregarTarea}>
          <input
            type='text'
            value={nombreFront}
            placeholder='Escribe una tarea'
            onChange={(e) => setNombreFront(e.target.value)}
          />
          <button type='submit'>
            Agregar Tarea 
          </button>
        </form>
        <div className="hero">
          <img src={heroImg} className="base" width="170" height="179" alt="" />
          <img src={reactLogo} className="framework" alt="React logo" />
          <img src={viteLogo} className="vite" alt="Vite logo" />
        </div>
        <div>
          <h1>Get started</h1>
          <p>
            Edit <code>src/App.jsx</code> and save to test <code>HMR</code>
          </p>
        </div>
        <button
          type="button"
          className="counter"
          onClick={() => setCount((count) => count + 1)}
        >
          Count is {count}
        </button>
      </section>

      <div className="ticks"></div>

      <section id="next-steps">
        <div id="docs">
          <svg className="icon" role="presentation" aria-hidden="true">
            <use href="/icons.svg#documentation-icon"></use>
          </svg>
          <h2>Documentation</h2>
          <p>Your questions, answered</p>
          <ul>
            <li>
              <a href="https://vite.dev/" target="_blank">
                <img className="logo" src={viteLogo} alt="" />
                Explore Vite
              </a>
            </li>
            <li>
              <a href="https://react.dev/" target="_blank">
                <img className="button-icon" src={reactLogo} alt="" />
                Learn more
              </a>
            </li>
          </ul>
        </div>
        <div id="social">
          <svg className="icon" role="presentation" aria-hidden="true">
            <use href="/icons.svg#social-icon"></use>
          </svg>
          <h2>Connect with us</h2>
          <p>Join the Vite community</p>
          <ul>
            <li>
              <a href="https://github.com/vitejs/vite" target="_blank">
                <svg
                  className="button-icon"
                  role="presentation"
                  aria-hidden="true"
                >
                  <use href="/icons.svg#github-icon"></use>
                </svg>
                GitHub
              </a>
            </li>
            <li>
              <a href="https://chat.vite.dev/" target="_blank">
                <svg
                  className="button-icon"
                  role="presentation"
                  aria-hidden="true"
                >
                  <use href="/icons.svg#discord-icon"></use>
                </svg>
                Discord
              </a>
            </li>
            <li>
              <a href="https://x.com/vite_js" target="_blank">
                <svg
                  className="button-icon"
                  role="presentation"
                  aria-hidden="true"
                >
                  <use href="/icons.svg#x-icon"></use>
                </svg>
                X.com
              </a>
            </li>
            <li>
              <a href="https://bsky.app/profile/vite.dev" target="_blank">
                <svg
                  className="button-icon"
                  role="presentation"
                  aria-hidden="true"
                >
                  <use href="/icons.svg#bluesky-icon"></use>
                </svg>
                Bluesky
              </a>
            </li>
          </ul>
        </div>
      </section>

      <div className="ticks"></div>
      <section id="spacer"></section>
    </>
  )
}

export default App
