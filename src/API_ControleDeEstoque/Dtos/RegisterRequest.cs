﻿using System.ComponentModel.DataAnnotations;

namespace ProjetoControleDeEstoque.Dtos
{
    public class RegisterRequest
    {
        [Required, EmailAddress]
        public string Email { get; set; } = string.Empty;
        [Required]
        public string UserName { get; set; } = string.Empty;
        [Required]
        public string Cnpj{ get; set; } = string.Empty;
        [Required, DataType(DataType.Password)]
        public string Password { get; set; } = string.Empty;
        [Required, DataType(DataType.Password), Compare(nameof(Password), ErrorMessage = "Password do not match")]
        public string ConfirmPassword { get; set; } = string.Empty;

    }
}
