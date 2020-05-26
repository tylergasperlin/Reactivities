using System.Collections.Generic;
using System.Security.Claims;
using Application.Interfaces;
using Domain;
using System.IdentityModel.Tokens.Jwt;
using System.Text;
using Microsoft.IdentityModel.Tokens;
using System;

namespace Infrastructure.Security
{
    public class JwtGenerator : IJwtGenerator
    {
        public string CreateToken(AppUser user)
        {
            var claims = new List<Claim>
            {
                new Claim(JwtRegisteredClaimNames.NameId, user.UserName)
            };

            //Generate signing credentials
            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes("Super secret key"));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha512Signature); //the strongest algorithm there is

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(claims),
                Expires = DateTime.Now.AddDays(7),
                SigningCredentials = creds
            };

            var tokenHandler = new JwtSecurityTokenHandler();

            var token = tokenHandler.CreateToken(tokenDescriptor);

            return tokenHandler.WriteToken(token);
        }
    }
}