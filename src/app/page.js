'use client';

import React, { useState, useEffect } from 'react';

const generateNumbers = () => {
  let num1 = Math.floor(1000 + Math.random() * 9000);
  let num2 = Math.floor(1000 + Math.random() * 9000);

  if (num1 < num2) {
    [num1, num2] = [num2, num1];  // Asegurarse de que num1 siempre sea mayor o igual que num2
  }

  return { num1, num2 };
};

const SubtractionPractice = () => {
  const [numbers, setNumbers] = useState({ num1: 0, num2: 0 });
  const [userAnswer, setUserAnswer] = useState(Array(4).fill(''));
  const [message, setMessage] = useState('');
  const [activeBorrowIndex, setActiveBorrowIndex] = useState(null);
  const [randomImage, setRandomImage] = useState(null);
  const [audioUrl, setAudioUrl] = useState(null); // Estado para la URL del audio

  useEffect(() => {
    setNumbers(generateNumbers());
  }, []);

  const handleNewProblem = () => {
    setRandomImage(null);
    setNumbers(generateNumbers());
    setUserAnswer(Array(4).fill(''));
    setMessage('');
    setActiveBorrowIndex(null); // Limpiar el índice activo al generar un nuevo problema
  };

  const handleBorrow = (index) => {
    if (index > 0) {
      setActiveBorrowIndex(index);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const correctAnswer = (numbers.num1 - numbers.num2).toString().padStart(4, '0');
    const userAnswerString = userAnswer.join('');
    if (userAnswerString === correctAnswer) {
      // Mostrar imagen aleatoria
      const images = [
        '/goku.jpg',
        '/mine.jpg',
        // Agrega más rutas de imágenes según sea necesario
      ];
      const randomIndex = Math.floor(Math.random() * images.length);
      setRandomImage(images[randomIndex]);

      // Reproducir audio de respuesta correcta
      const audioFiles = [
        '/bien.m4a',
        '/bien2.m4a',
        // Agrega más rutas de audios según sea necesario
      ];
      const audioIndex = Math.floor(Math.random() * audioFiles.length);
      setAudioUrl(audioFiles[audioIndex]);
    } else {
      setMessage(`Nop, le pifiaste peque. La respuesta correcta es ${correctAnswer}.`);
      // Reproducir audio de respuesta incorrecta si deseas
    }
  };

  const handleChange = (index, value) => {
    const newUserAnswer = [...userAnswer];
    newUserAnswer[index] = value;
    setUserAnswer(newUserAnswer);
  };

  const renderNumberWithBorrow = (number, isTop) => {
    const digits = number.toString().padStart(4, '0').split('');
    return (
      <div className="flex space-x-2">
        {digits.map((digit, index) => (
          <div key={index} className="relative">
            {isTop && index === activeBorrowIndex && (
              <div className="absolute -top-5 left-0 text-xs text-red-500 cursor-pointer" onClick={() => handleBorrow(index)}>
                1
              </div>
            )}
            <div className="w-12 text-center">
              {digit}
            </div>
          </div>
        ))}
      </div>
    );
  };

  useEffect(() => {
    // Función para reproducir el audio cuando cambia la URL
    const playAudio = () => {
      if (audioUrl) {
        const audio = new Audio(audioUrl);
        audio.play();
      }
    };

    playAudio(); // Reproducir audio cuando se establece la URL
  }, [audioUrl]);

  return (
    <div className="flex flex-col items-center mt-12">
      <h1 className="text-3xl font-bold mb-8">Práctica de Restas para 3ero!</h1>

      <div className="text-2xl mb-0 pr-6 pb-3">
        <div className="flex justify-end">
          {renderNumberWithBorrow(numbers.num1, true)}
        </div>
        <div className="flex">
          <div className="w-12 text-center">-</div>
          {renderNumberWithBorrow(numbers.num2, false)}
        </div>
        <div className="border-t-2 border-black w-full mt-2"></div>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col items-center">
        <div className="flex space-x-2">
          {userAnswer.map((digit, index) => (
            <input
              key={index}
              type="text"
              value={digit}
              onChange={(e) => handleChange(index, e.target.value)}
              maxLength="1"
              className="text-2xl p-2 border-2 border-gray-300 rounded-md text-center w-12"
            />
          ))}
        </div>
        <button
          type="submit"
          className="text-xl bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 mt-4"
        >
          Quiero ver si esta bien :D
        </button>
      </form>

      {randomImage && (
        <div className="mt-4" style={{
          backgroundImage: `url(${randomImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          width: '250px',
          height: '250px',
          borderRadius: '50%',
        }}></div>
      )}

      {message && <p className="text-xl mt-4">{message}</p>}
      <button
        onClick={handleNewProblem}
        className="text-lg bg-gray-300 text-gray-800 py-2 px-4 rounded-md hover:bg-gray-400 mt-4"
      >
        Nueva Cuenta
      </button>
    </div>
  );
};

export default SubtractionPractice;
