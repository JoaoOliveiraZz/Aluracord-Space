import appConfig from '../config.json'
import { Box, Button, Text, TextField, Image} from '@skynexui/components'
import {useRouter} from "next/router"
import React from 'react'




function Titulo(props){

    const Tag = props.tag || 'h1';
    return(
        <>
        <Tag>{props.children}</Tag>
        <style jsx>{`
            ${Tag}{
                color: ${appConfig.theme.colors.neutrals['200']};
            }
        `}</style>
        </>
    );
}




// function HomePage(){

//     return(
//         <div>
//             <GlobalStyle />
//             <Titulo tag="h2">Boas Vindas de volta</Titulo>
//             <h2>Discord - Alura</h2>
//         </div>
//     ) 

// }

// export default HomePage

export default function PaginaInicial() {
    // const username = 'JoaoOliveiraZz';
    const [username, setUsername] = React.useState('JoaoOliveiraZz');
    const [userlocation, setLocation] = React.useState('Minas Gerais, Brasil');
    const [userFollowers, setFollowers] = React.useState('1');

    const Roteamento = useRouter();
    // const Dados = {
    //     Nome: username,
    //     Localidade: '',
    //     Seguidores: ''
    // }
    function UserData(dados){
        if(dados.location == undefined){
            setLocation('Sem localização')
        }else{
            setLocation(dados.location);
        }
        if(dados.followers == undefined){
            setFollowers('0');
        }else{
            setFollowers(`Followers: ${dados.followers}`)
        }
    }
    
  
    return (
      <>
      
        <Box
          styleSheet={{
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            //backgroundColor: appConfig.theme.colors.primary[500],
            backgroundImage: 'url(https://wallpaperaccess.com/full/1145427.jpg)',
            backgroundRepeat: 'no-repeat', backgroundSize: 'cover', backgroundBlendMode: 'multiply',
          }}
        >
          <Box
            styleSheet={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexDirection: {
                xs: 'column',
                sm: 'row',
              },
              width: '100%', maxWidth: '700px',
              borderRadius: '5px', padding: '32px', margin: '16px',
              boxShadow: '0 2px 10px 0 rgb(0 0 0 / 20%)',
              backgroundColor: appConfig.theme.colors.neutrals[700],
            }}
          >
            {/* Formulário */}
            <Box
              as="form"
              onSubmit = {(evento) => {
                evento.preventDefault();
                //   window.location.href = '/chat' Forma antiga de mudar a página, ainda funciona, porém ela da refresh na página
                Roteamento.push('/chat'); //Dessa forma não da refresh
              }}
              styleSheet={{
                display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                width: { xs: '100%', sm: '50%' }, textAlign: 'center', marginBottom: '32px',
              }}
            >
              <Titulo tag="h2">Saudações, viajante</Titulo>
              <Text variant="body3" styleSheet={{ marginBottom: '32px', color: appConfig.theme.colors.neutrals[300] }}>
                {appConfig.name}
              </Text>
  
              <TextField
                value = {username}
                onChange = { (event) => {
                    const valor = event.target.value;
                    setUsername(valor);
                }}
                onBlur = {(event) => {
                    let url = `https://api.github.com/users/${username}`
                    fetch(url).then((response) => {
                        response.json().then((data)=>{
                            console.log('Chamou');
                            UserData(data);
                        })
                    })
                }}
                placeholder = 'GitHub user'
                fullWidth
                textFieldColors={{
                  neutral: {
                    textColor: appConfig.theme.colors.neutrals[200],
                    mainColor: appConfig.theme.colors.neutrals[900],
                    mainColorHighlight: appConfig.theme.colors.primary[500],
                    backgroundColor: appConfig.theme.colors.neutrals[800],
                  },

                }}
              />
              <Button
                type='submit'
                label='Entrar'
                fullWidth
                buttonColors={{
                  contrastColor: appConfig.theme.colors.neutrals["000"],
                  mainColor: appConfig.theme.colors.primary[500],
                  mainColorLight: appConfig.theme.colors.primary[400],
                  mainColorStrong: appConfig.theme.colors.primary[700],
                }}
              />
            </Box>
            {/* Formulário */}
  
  
            {/* Photo Area */}
            <Box
              styleSheet={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                maxWidth: '200px',
                padding: '16px',
                backgroundColor: appConfig.theme.colors.neutrals[800],
                border: '1px solid',
                borderColor: appConfig.theme.colors.neutrals[999],
                borderRadius: '10px',
                flex: 1,
                minHeight: '240px',
              }}
            >
              <Image
                styleSheet={{
                  borderRadius: '50%',
                  marginBottom: '16px',
                }}
                src={`https://github.com/${username}.png`}
              />
              <Text
                variant="body4"
                styleSheet={{
                  color: appConfig.theme.colors.neutrals[200],
                  backgroundColor: appConfig.theme.colors.neutrals[900],
                  padding: '3px 10px',
                  borderRadius: '1000px',
                  marginBottom: '3px'
                }}
              >
                {username}
                {/* {Dados.Localidade}
                {Dados.Seguidores} */}
              </Text>
              <Text
                variant="body4"
                styleSheet={{
                  color: appConfig.theme.colors.neutrals[200],
                  backgroundColor: appConfig.theme.colors.neutrals[900],
                  padding: '3px 10px',
                  borderRadius: '1000px',
                  marginBottom: '3px'
                }}
              >
                {userlocation}
               
              </Text>
              <Text
                variant="body4"
                styleSheet={{
                  color: appConfig.theme.colors.neutrals[200],
                  backgroundColor: appConfig.theme.colors.neutrals[900],
                  padding: '3px 10px',
                  borderRadius: '1000px'
                }}
              >
                {userFollowers}
               
              </Text>
            </Box>
            {/* Photo Area */}
          </Box>
        </Box>
      </>
    );
  }