import React, { useEffect } from 'react';
import Swal from 'sweetalert2';
import axios from 'axios';

export default function EnviarFeedbackModal() {
  useEffect(() => {
    const enviarFeedback = async () => {
      const { value: formValues } = await Swal.fire({
        title: "ENVIAR FEEDBACK",
        html: `
        <style>
        .input-container {
            margin-bottom: 20px;
        }
        
        .label-email {
            margin-left: 35px;
            font-weight: bold;
            text-align: left;
            display: block;
            margin-bottom: 5px;
        }
        
        .label-description {
            margin-left: 35px;
            font-weight: bold;
            text-align: left;
            display: block;
            margin-bottom: 5px;
        }
        
        .swal2-textarea {
            resize: none; 
            width: 370px; 
            height: 100px;
        }
        
        .swal2-input {
            width: 370px; 
        }
        
        </style>
        
        <div class="input-container">
            <label for="swal-input1" class="label-email">E-MAIL</label>
            <input id="swal-input1" class="swal2-input" placeholder="Seu e-mail">
        </div>
        
        <div class="input-container">
            <label for="swal-input2" class="label-description">FEEDBACK</label>
            <textarea id="swal-input2" class="swal2-textarea" placeholder="Descreva seu feedback aqui..."></textarea>
        </div>
        `,

        focusConfirm: false,
        showCancelButton: true,
        showCloseButton: true,
        
        preConfirm: async () => {
          const email = document.getElementById('swal-input1').value;
          const descricao = document.getElementById('swal-input2').value;

          if (!email || !descricao) {
            Swal.showValidationMessage('Por favor, preencha todos os campos.');
            return false;
          }

          if (!isValidEmail(email)) {
            Swal.showValidationMessage('Por favor, insira um endereço de e-mail válido.');
            return false;
          }

          try {
            const response = await axios.post('https://localhost:44398/api/FeedBack/EnviarFeedBack', {
              email,
              descricao
            });

            return [email, descricao];
          } catch (error) {
            console.error('Erro ao enviar feedback:', error);
            Swal.showValidationMessage('Ocorreu um erro ao enviar o feedback. Por favor, tente novamente.');
            return false;
          }
        }
      });
      
      if (formValues) {
        const [email, descricao] = formValues;

        const Toast = Swal.mixin({
          toast: true,
          position: "top-end",
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.onmouseenter = Swal.stopTimer;
            toast.onmouseleave = Swal.resumeTimer;
          }
        });
        
        Toast.fire({
          icon: "success",
          title: "Enviado com sucesso!"
        });
      }
    };
    
    enviarFeedback();
  }, []);

  const isValidEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  return null;
}