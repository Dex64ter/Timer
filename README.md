# Aprofundando em Hooks

## Estrutura da Aplicação e Styled Components

  O Styled Components é uma biblioteca de CSS-in-JS que permite que a gente utilize o CSS dentro do JavaScript e em um formato parecido com os do React, adicionando muitas funcionalidades à estilização da nossa aplicação.

  Para instalar o Styled-components, basta utilizar o gerenciador de projeto no seu terminar e instalar:

```terminal
npm i styled-components

yarn add styled-components
```

  Além do pacote do styled-components devemos instalar a versão para typescript para ambiente de desenvolvimento:

```terminal
npm i @types/styled-components

yarn add @types/styled-components
```
  
  A exemplo das funcionalidades podemos usar diferentes temas de estilização com o styled components. Na nossa aplicação criamos uma pasta de estilos e dentro dela uma pasta somente para os temas do projeto.

  ![Organização da pasta styles](./public/imgs/pastas-styles.png)

  Dentro dele teremos um esquema de exportação da variável que possui as cores do tema padrão da aplicação.

```typescript
// default.ts
export const defaultThemes = {
  white: '#FFF',

  'gray-100': '#E1E1E6',
  'gray-300': '#C4C4CC',
  'gray-400': '#8D8D99',
  'gray-500': '#7C7C8A',
  'gray-600': '#323238',
  'gray-700': '#29292E',
  'gray-800': '#202024',
  'gray-900': '#121214',

  'green-300': '#00B37E',
  'green-500': '#00875F',
  'green-700': '#015F43',

  'red-500': '#AB222E',
  'red-700': '#7A1921',

  'yellow-500': '#FBA94C',
}
```

  Para usar o tema temos nosso exemplo de botão na aplicação. Como a maioria dos elementos no React, temos um documento typescript para usar o styled-components, dessa forma, temos o arquivo `Button.styles.ts` como um arquivo de estilização em _typescript_.

  ```typescript
  // Button.styles.ts

  import styled from "styled-components";
  
  export const ButtonContainer = styled.button<ButtonProps>`
    height: 40px;
    width: 100px;
  `;
  ```

  Uma das muitas vantagens que temos ao usar o styled components é que ao tratarmos este arquivo como um componente, podemos receber propriedades do componente pai para estilização também. Assim, podemos desfrutar de diferentes temas para o mesmo componente sem precisar de várias estruturas css.

  ```typescript
  // Button.styles.ts

  import styled from "styled-components";
  
  export type ButtonVariant = "primary" | "secondary" | 'danger' | 'success';

  interface ButtonProps {
    variant?: ButtonVariant;
  }

  const buttonVariants = {
    primary: 'purple',
    secondary: 'blue',
    danger: 'red',
    success: 'green'
  }

  export const ButtonContainer = styled.button<ButtonProps>`
    height: 40px;
    width: 100px;

    ${(props) => {
    return `
      background-color: ${buttonVariants[props.variant || 'primary']}
    `
    }}
  `;
  ```

  No exemplo acima o componente de estilização recebe uma propriedade e a partir dele mostra a estilização específica dada como parâmetro para o botão.

## Estilos Globais

  É comum em aplicações web termos configurações de estilos globais. O Styled Components também nos ajuda com isso, por meio de uma função chamada `createGlobalStyle`.

  Dentro da pasta de estilos já temos o caminho para os temas com todas as cores que usaremos e além dela criamos o arquivo `global.ts` onde implementamos todas as estilizações padrões da nossa aplicação usando a função citada anteriormente.

```typescript
// global.ts
import { createGlobalStyle } from 'styled-components'

export const GlobalStyles = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    background: ${props => props.theme['gray-900']};
    color: ${props => props.theme['gray-300']};
  }

  body, input, textarea, button {
    font-family: 'Roboto', sans-serif;
    font-weight: 400;
    font-size: 1rem;
  }
`;
```

  E como foi citado antes, as variáveis de cores são acessadas por funções dentro de expressões embutidas `${}`.

  Para usarmos os estilos globais dentro do projeto, importamos as configurações e as variáveis de estilo dentro do arquivo `App.tsx` para usarmos em toda a aplicação.

```typescript
// App.tsx
import { ThemeProvider } from 'styled-components'
import { Button } from "./components/Button"
import { defaultThemes } from './styles/themes/default'
import { GlobalStyles } from './styles/global'

export function App() {

  return (
    <ThemeProvider theme={defaultThemes}>
      <GlobalStyles/>
      
      <Button variant="primary"/>
      <Button variant="danger" />
    </ThemeProvider>
  )
}
```

  Dentro do styled-components a função `ThemeProvider` fornece um componente para manipulação de temas para o projeto. Usamos ele ao redor dos componentes com a propriedade `theme=` que permite adicionar o arquivo de temas para ser acessado.

  Anteriormente tinhamos o fragment `<></>` por volta dos componentes, mas para que todo o projeto consiga utilizar os temas devemos colocar o componente `<ThemeProvider>` fornecido pelo _styled-components_.

  Já o `<GlobalStyles/>` pode ser usado dentro da aplicação em qualquer lugar, com isso as estilizações serão configuradas no projeto.

## Tipagem de Temas

  Algumas configurações do Styled Components não permite que acessemos todas ass variáveis quando exportadas, para isso criamos um arquivo de definição de tipos que tem como sufixo `.d.ts` presente na pasta **/@types**.

  No arquivo `styled.d.ts` temos uma configuração padrão para definir os tipos das variáveis exportadas nos temas do styled-components do nosso projeto. Geralmente usamos isso para o styled-components e não é necessário memorizar a utilização desse arquivo, podemos usá-lo na maioria dos nossos projetos da mesma forma como está neste.

```typescript
import 'styled-components'
import { defaultThemes } from '../styles/themes/default'

type ThemeType = typeof defaultThemes;

declare module 'styled-components' {
  export interface DefaultTheme extends ThemeType {}
}
```

  Essa coniguração permite acessar as variáveis mais facilmente em qualquer lugar do projeto.
# Páginas e Rotas
## React Router dom

  Nessa parte do projeto, iniciaremos a utilização e aprendizado nas rotas de uma aplicação. Basicamente a capacidade de mudar de página em um site na web.

  Para isso vamos utilizar a biblioteca mais famosa em construir rotas no react que é a React Router Dom. Mais informações de como utilizar pode-se acessar o links da [documentação](https://reactrouter.com/en/main)  e da introdução a ele na [w3 School](https://www.w3schools.com/react/react_router.asp).

```terminal
npm i react-router-dom

yarn add react-router-dom
```

  Depois da instalação, recomenda-se criar uma pasta dentro do `/src` chamada __/pages__ `/src/pages`. Dentro dela criaremos os caminhos pelos quais a nossa aplicação percorrerá durante sua execução.

  No nosso projeto criamos os componentes `Home.tsx` e `History.tsx`. Essa fase não é necessária, poderiam ser criados dentro do próprio App.tsx, mas por questão de melhor organização do projeto, optamos por deixar dessa forma.

  ![Pasta Pages](/public/imgs/pasta-pages.png)

  Agora para podermos acessá-los devemos configurar as "Routes" dentro do nosso App.tsx que é a raiz da nossa aplicação. Para isso temos duas opções, podemos criar e importar nossas ferramentas do react-router diretamente no componente `App.tsx` ou criar um componente a parte com a configuração e importações necessárias para acoplarmos ao `App.tsx` em seguida.

  Por razões de organização, vamos para a última opção citada criando o arquivo Router.tsx que conterá a configuração dos caminhos da aplicação.

```js
// Router.tsx
import { Routes, Route } from 'react-router-dom';

import { Home } from './pages/Home';
import { History } from './pages/History';
 
export function Router() {

  return (
    <Routes>
      <Route path='/' element={ <Home/> } />
      <Route path='/history' element={ <History/> } />
    </Routes>
  );
}
```

  O **Routes** é uma ferramenta utilizada para guardar o conjunto de componentes **Route** onde cada um deles possuirá um caminho da aplicação.

  Cada `<Route>` possui as propriedades `path=` que indica o caminho da url para aquela rota e `element=` que indica qual componente será mostrado naquela rota.

  A execução dessas rotas será feita dentro do `App.tsx` com o componente **Router** importado do aquivo criado e com o componente `BrowserRouter` importado da biblioteca react-router-dom.

```js
// App.tsx
import { ThemeProvider } from 'styled-components';
import { BrowserRouter } from 'react-router-dom';
import { defaultThemes } from './styles/themes/default';
import { GlobalStyles } from './styles/global';
import { Router } from './Router';

export function App() {

  return (
    <ThemeProvider theme={defaultThemes}>
      <BrowserRouter>
        <Router />
      </BrowserRouter>
      <GlobalStyles/>
    </ThemeProvider>
  )
}
```

  Os componentes citados não são mostrados em tela pois eles são _**Context Providers**_ então eles não estão em volta de todos os outros compontes para mostrar algo em tela mas sim para dar a eles informações sobre o contexto em que eles estão inseridos.

  O BrowserRouter armazena a localização atual na barra de endereço do navegador usando URLs limpos e navega usando a pilha de histórico integrada do navegador.

## Layouts de Rotas

  O assunto nessa parte é opcional pois não é necessário ter essa mesma organização de pastas. Entretanto, a criação do Layout é uma ajuda para evitar colocar o mesmo componente em vários outros componentes de página.

  A biblioteca React Router Dom possui funcionalidades que permitem usar um ou mais layouts em uma ou mais páginas. Geralmente utilizamos essa ferramenta evitando repetições desnecessárias de componentes no nosso caso o `Header.tsx`.

```js
// /layouts/DefaultLayout.tsx

import { Outlet } from "react-router-dom";
import { Header } from "../components/Header";

export function DefaultLayout() {
  return (
    <div>
      <Header />
      <Outlet />
    </div>
  );
}
```

  O componente em questão `DefaultLayout.tsx` é um Layout usado na nossa aplicação. O `<Outlet/>` é um elemento do React Router que mostra onde as páginas dos caminhos devem ser integrados. Dessa forma, o `<Header/>` vai ser mostrado em todas as páginas da aplicação.

  Dentro do `Router.tsx` colocamos mais um elemento `<Route>` ao redor dos outros elementos `<Route>` de cada página para configurar quais conjuntos de páginas possuirão o layout destacado.

```js
// Router.tsx
// ...
return (
  <Routes>
    <Route path='/' element={ <DefaultLayout/> }  >
      <Route path='/' element={ <Home/> } />
      <Route path='/history' element={ <History/> } />
    </Route>
  </Routes>
);
```

## Header & Layout

  A partir daqui, vamos organizar os componentes criados em pastas com seus nomes. Cada um dos componentes estará presente dentro de uma pasta com o nome do componente, dentro dessa pasta temos um arquivo `index.tsx` e outro `styles.tsx`.

  ![Organização de pastas dos componentes da aplicação](./public/imgs/pastas-dos-componentes.png)

  A organização dessa forma auxilia na implementação de novas features em cada componente. Cada um deles pode ter vários outros arquivos de configuração, não somente de estilo.

  ### Layout
  Na estilização do nosso __DefaultLayout__ criamos um style componente `<DefaultLayoutContainer/>` e a peculiaridade da sua estilização é o uso do `calc()` no valor da propriedade _height_.

```css
/*
  DefaultLayout/styles.tsx
*/
height: calc(100vh - 7rem);
```

  O uso do __height__ com `calc()` é útil para usar todo o espaço em tela sem precisar de uma scrollbar.

  ### Header
  Na criação do Header, segundo o design, colocamos uma logo de um lado da aplicação e um menu de navegação do outro lado. Para estilizarmos todas as tags e elementos, criamos um styled-component chamado `<HeaderContainer/>`.

```js
// Header/index.tsx
import { HeaderContainer } from "./styles";
import { Scroll, Timer } from 'phosphor-react'
import Logo from '../../assets/Logo.svg'

export function Header(){
  return (
    
  <HeaderContainer>
    <img src={Logo} alt="Logo com dois triângulos de lado sobrepostos" />
    <nav>
      <a href="/" title="Timer">
        <Timer size={24} />
      </a>
      <a href="/history" title="histórico">
        <Scroll size={24} />
      </a>
    </nav>
  </HeaderContainer>
  );
}
```
  A imagem da Logo foi exportaa do figma como ___*.svg*___ e os ícones dentro das âncoras vieram da biblioteca [Phosphor React](https://phosphoricons.com). As âncoras possuem proprieades _title_ por acessibiliade, geralmente em links que possuem apenas imagens é útil colocarmos um título para o usuário saber o que ou para onde o link o levará.

  A biblioteca react-douter-dom possui um componente muito útil que usamos na nossa aplicação e que pode ser usado em âncoras de navegação como essas dentro do `Header` é o componente `NavLink`.

```js
import { NavLink } from "react-router-dom";
 
export function Header() {
  return (
    <HeaderContainer>
      <img src={Logo} alt="Logo com dois triângulos de lado sobrepostos" />
      <nav>
        <NavLink to="/" title="Timer">
          <Timer size={24} />
        </NavLink>
        <NavLink to="/history" title="histórico">
          <Scroll size={24} />
        </NavLink>
      </nav>
    </HeaderContainer>
  );
}
```

  Esse componente funciona como uma tag `<a>` só que dentro do processo de rotas do react-router-dom, ao invés de `href` usa-se `to`.
  
  No browser, ao serem clicados para mudança de página, o componente clicado ganha uma classe `active` que pode ser instanciada pelo arquivo de estilos do componente.

  ## Página: Home
  Na estruturação da página Home foram criados 7 diferentes componentes do styled-componentes que estão implementados dentro do arquivo `Home/styles.tsx` da pasta do componente `/Home/`.

  Nessa nossa página principal, a estrutura `<form/>` receberá as novas tarefas e o tempo que vamos dar para cada tarefa no Timer.

  No começo da estrutura Form temos os componentes `<FormContainer>`, `<CountDownContainer>` e `<StartCountDownButton>` que organizam toda a estrutura da box do Timer.

  Duas estruturas são muito importantes nessa página. Dentro de `<FormContainer/>` temos o componente `<TaskInput/>` que é um input do tipo "text" e na nossa aplicação é interessante ter sugestões para o usuário escrever.

```js
// Home/index.tsx
return (
  // ...
  <label htmlFor="task" >Vou trabalhar em</label>
  <TaskInput id="task" placeholder="Dê um nome para seu projeto" list="task-suggestions"/>

  <datalist id="task-suggestions">
    <option value="Trabalhar no projeto" />
    <option value="Estudar tecnologia" />
    <option value="Trabalhar no TCC" />
  </datalist>
  // ...
)
```
A tag `<datalist>` nos da a possibilidade de adicionar opções com as tags `<option value=?>` para os inputs do tipo "text".

  A próxima estrutura interessante é o componente `<MinutesAmountInput>` que é um input do tipo "number" o qual podemos colocar diferentes propriedades nele como é mostrado no código dele.

```js
// Home/index.tsx
return (
  // ...
  <label htmlFor="minutesAmount">durante</label>
  <MinutesAmountInput
    id="minutesAmount"
    type="number"
    placeholder="00"
    step={5}
    max={60}
    min={0}
    
  />
  <span>minutos</span>
  // ...
)
```
Todas as propriedades foram úteis para colocar um limite de valor para a entrada de dados e um mínimo.

  ### estilizações e herança
  A parte interessante nas estilizações da página Home podemos citar o uso de herança entre os componentes usados na página. Dois ou mais componentes podem usar outro como base, dessa forma usando todas as características dele com adição das próprias.

```js

const BaseInput = styled.input`
  background: transparent;
  height: 2.5rem;
  border: 0;
  border-bottom: 2px solid ${(props) => props.theme['gray-500']};

  ...
  
`; 

export const TaskInput = styled(BaseInput)`
  flex: 1;

  &::-webkit-calendar-picker-indicator{
    display: none !important;
  }
`;

export const MinutesAmountInput = styled(BaseInput)`
  width: 4rem;
`;
```
Foi usado o componente `BaseInput`, que não é exportado, ou seja, só poderá ser usado dentro daquele arquivo, como "base" para outros componentes do mesmo tipo. No nosso caso, criamos os componentes exportados e ao invés de citar o tipo de estrutura dele, nós colocamos `styled([nome do componente base])` para recebermos as características e tipos de outro componente como base para outro.

  ## Página: History
  Na página de histórico temos uma estruturação mais simples que a Home. Basicamente, um título e uma tabela com uma div por volta.

```js
export function History() {
  return (
    <HistoryContainer>
      <h1>Meu histórico</h1>

      <HistoryList>
        <table>
          <thead>
            <tr>
              <th>Tarefa</th>
              <th>Duração</th>
              <th>Início</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Tarefa</td>
              <td>25 minutos</td>
              <td>Há 2 meses</td>
              <td>
                <Status statusColor="yellow">
                  Em andamento
                </Status>
              </td>
            </tr>
          </tbody>
        </table>
      </HistoryList>
    <HistoryContainer>
  )
}
```
  O `HistoryList` é um componente styled o tipo `div` e ele será útil por conta da table em versões mobile. A table em si não fica muito legal em versões mobile então a div ao redor dela ajuda a melhorar a sua visualização colocando scroll na tabela.

  Na estilização do `<History/>` temos algumas coisa que gosto de enfatizar. O primeiro é a propriedade `border-collapse` que ajuda na amostragem de tabelas quando formos melhorar a sua visualização de bordas, caso tenha duas bordas muito próximas, essa propriedade deixa apenas uma borda entre as duas estruturas.

  Uma outra parte importante é a parte do `Status` que nos é muito bom e ajuda a ver porquê o styled-components é tão útil.

```js
const STATUS_COLOR = {
  yellow: 'yellow-500',
  green: 'green-500',
  red: 'red-500',
} as const

interface StatusProps {
  statusColor: keyof typeof STATUS_COLOR
}

export const Status = styled.span<StatusProps>`
  display: flex;
  align-items: center;
  gap: .5rem;

  &::before {
    content: '';
    width: .5rem;
    height: .5rem;
    border-radius: 50%;
    background-color: ${(props) => props.theme[STATUS_COLOR[props.statusColor]]};
  }
`;
```
Na implementação do componente __Status__ temos a ferramente `::before` que cria um elemento anteriormente ao conteúdo daquele componente específico. O elemento criado será a cor da situação de uma tarefa no histórico.

  Nós também podemos passar propriedades para o `Status`. Como no exemplo, a interface nos cria a propriedade "statusColor" que nos diz qual cor vamos usar.

  O objeto `STATUS_COLOR` nos dá um mapeamento das cores ou dos valores das cores que estamos usando, por conta do Typescript devemos usar o _`as const`_ para reitificarmos que o objeto possui valores constantes descritos nele, e com esse objeto nos estanciamos a cor lá no background-color do elemento `::before`.

  # Formulários

  ## Controlled e Uncontrolled
  Nessa parte vamos entender as diferenças entre componentes controlados e componentes não controlados. É muito importante entender esses termos pois eles nos ajudam a entender como o React funciona

  ### Controlled
  Controlled nada mais é do que mantermos em tempo real o estado da informação que o usuário insere na nossa aplicação dentro de uma variável do nosso componente, ou seja, sempre que ele alterar o valor da entrada, o estado é alterado contendo esse novo valor tendo sempre atualizado.

  Há o monitoramento de cada digitação do usuário para salvar em um estado, isso nos dá fácil acesso aos valores em tempo real e facilita alterar a interface como um todo baseado no valor das entradas do usuário. Toda essa funcionalidade traz mais fluidez para as aplicações.

  Entretanto, no react, sempre que alteramos/alteramos um estado provocamos uma nova renderização. Basicamente, o react precisa recalcular todo o componente baseado no estado que foi mudado. Não necessariamente é um processo lento, mas se houver interfaces com muita complexidade com diversas informações essa re-renderização pode sim se tornar um gargalo.

  ### Uncontrolled
  Uncontrolled é um método em que não monitoramos o valor digitado em tempo real. Ao contrário do **controlled** esse método não trará tanta fluidez mas melhorará em performance nas interfaces com muitas informações ou muitas entradas de dados.

  Geralmente usamos métodos conhecidos do javascript para recuperar os valores dos campos, como o uso do _"event.target.value"_ que é recuperado somente na submissão de um formulário, no envio de um input, na alteração de foco, etc.

  ## React Hook Form
  A react-hook-form é uma biblioteca na qual nos ajuda a usar tanto o **Controlled** como o **Uncontrolled**, o melhor dos dois mundos, ela é pensada principalmente na performance da aplicação.

  Com ela temos a capacidade de isolar novas renderizações de componentes, o que leva a um melhor desempenho em sua página ou aplicativo.

  Para iniciarmos o seu uso primeiro devemos importar a função `useForm` dentro da nossa página `Home/index.tsx` onde está o nosso formulário.

```js
// Home/index.tsx
// ...
import { useForm } from 'react-hook-form';
// ...

export function Home() {
  const { register, handleSubmit, watch } = useForm();

  function onHandleSubmit(data: any) {
    console.log(data)
  }

  const task = watch("task");
  const isSubmitDisabled = !task;

  return (
    // ...
    <HomeContainer>
      <form onSubmit={handleSubmit(onHandleSubmit)} action="">
        <FormContainer>
          <label htmlFor="task">Vou trabalhar em</label>
          <TaskInput
            id="task"
            placeholder="Dê um nome para seu projeto"
            list="task-suggestions"
            {...register("task") }
          />

          {
            /* 
            
            ... 
            
            */
          }

          <MinutesAmountInput
            id="minutesAmount"
            type="number"
            placeholder="00"
            step={5}
            max={60}
            min={0}
            {...register("minutesAmount", {valueAsNumber: true}) }
          />

          {
            /* 
            
            ... 
            
            */
          }

          <StartCountDownButton disabled={isSubmitDisabled} type="submit">
            <Play size={24} />
            Começar
          </StartCountDownButton>
        </FormContainer>
      </form>
  );
}
```
  Três importantes funções são desestruturadas do hook `useForm()`, a **register**, a **handleSubmit** e a **watch**. Cada uma dessa funções nos ajudam no uso de Controlled e Uncontrolled.

  O `register()` é usado dentro de cada input do nosso formulário pois ele funciona como um. Ele nada mais é do que uma função que dentro dele possui todos os métodos de um input normal, além de diversos métodos de validação, por essa razão, utilizamos o operador _spread_ `...` antes da função para recuperarmos todos esses métodos para o input em questão.

  `{...register("Nome_do_input") }`

  Dentro dos parâmetros do `register` colocamos o nome desejado do input, não fazendo mais necessário o uso da propriedade `name=`, além disso, como é mostrado na entrada de `<MinutesAmountInput/>`, podemos colocar um objeto de configurações para passarmos o valor da maneira que desejarmos que no caso dessa entrada foi passar como um número porque como padrão ele aparece como string.

  `{...register("minutesAmount", {valueAsNumber: true}) }`

  O `handleSubmit` é uma função usada na submissão do formulário que recebe outra função como parâmetro.
  
  ```
  function onHandleSubmit(data: any) {
    console.log(data)
  }

  <form onSubmit={handleSubmit(onHandleSubmit)} action="">
  ``` 

  Essa função como parâmetro receberá os dados dos _registers_ dentro de cada input.

  Até agora foram mostrados métodos que utilizam Uncontrolled para verificar os dados. A função `watch` é a forma Controlled de monitorar os dados, monitorando uma variável em tempo real poderemos alterar em tempo real componentes da interface, o que foi o caso do botão de submissão e sua propriedade `disabled`.

  `const task = watch("task");`

  Recuperamos o estado do input com o nome "task" dado pelo `register` e passamos essa variável para uma variável auxiliar para melhorar a legibilidade do código.

  ```
  const task = watch("task");
  const isSubmitDisabled = !task;
  ...
  <StartCountDownButton disabled={isSubmitDisabled} type="submit">
  ```

  ## Validando Formulários
  Por padrão o React Hook Form não traz nada de validação, ele prefere se manter mais enxuto e se utilizar de outras bibliotecas muito boas integradas a ele.

  Uma das que vamos utilizar nesse projeto é a 'zod' pois ela traz um pouco mais de integração com typescript. Para usarmos basta instalar a biblioteca `@hookform/resolvers` pelo instalador de pacotes.

`npm i @hookform/resolvers` 

  Dentro do hook `useForm` podemos criar um objeto de configuração e uma de suas propriedades é o `resolver:` que será o local em que vamos inserir a função de validação `zodResolver`.

```ts
// Home/index.tsx
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as zod from 'zod';

const newCycleFormSchema = zod.object({
  task: zod.string().min(1, 'Informe a tarefa'),
  minutesAmount: zod
    .number()
    .min(5, 'O ciclo precisa ser de no mínimo 5 minutos')
    .max(60, 'O ciclo precisa ser de no máximo 60 minutos')
})

// ...

export function Home() {
  const { register, handleSubmit, watch, reset } = useForm({
    resolver: zodResolver(newCycleFormSchema),
  });
  // ...
}
```

  A variável de validação `newCycleFormSchema` nos mostra a configuração do zod na aplicação. Vamos validar um objeto, pois a resposta do `handleSubmit` é um objeto, e dentro desse objeto integramos quais tipos de dados e quais validações queremos verificar neles, como mínimo de caracteres, máximo de caracteres, valor mínimo, tipo de dado, etc.

  É possível adicionar uma mensagem de erro caso a validação esteja incorreta.

  ```js
  task: zod.string().min(1, 'Informe a tarefa'),
  ```

  ## Typescript no formulário
  Aqui vamos apenas melhorar a integração do formulário com typescript.

  Nesse caso, vamos estipular um tipo para a saída da submissão do formulário. Podemos adicionar uma interface e colocar no nosso data como sendo o tipo desse dado.

```ts
interface NewCycleFormData {
  task: string,
  minutesAmount: number
}

// ...

function onHandleSubmit(data: NewCycleFormData) {
  console.log(data)
  reset();
}

// ...
```

  Contudo, uma coisa interessante que podemos utilizar é uma das propriedades de configuração que podemos passar para o `useForm({})`, o `defaultValues:` e ela traz a possibildidade da gente passar qual o valor inicial de cada campo e é isso que fazemos.

  Para que identifiquemos quais campos o react-hook-form possui, que no nosso caso é o campo _task_ e _minutesAmount_, podemos colocar um generic `<>` para ele.

```ts
export function Home() {
  const { register, handleSubmit, watch, reset } = useForm<NewCycleFormData>({
    resolver: zodResolver(newCycleFormSchema),
    defaultValues: {
      task: '',
      minutesAmount: 0
    }
  });
// ...
}
```

O Zod possui um método que extrai a tipagem de uma variável de dentro do esquema de validação com a função `.infer<typeof NewCycloFormData>` e passamos essa tipagem para as nossas variáveis ao invés da interface.

```ts
type NewCycleFormData = zod.infer<typeof newCycleFormSchema>
```

  Usando a interface também está certo, essa é só mais uma forma de ser feito e que fica bem legal na aplicação.

  Uma outra função importante que podemos utilizar é a função `reset()` do `useForm()`. Ela por padrão volta os valores dos inputs implementados para os valores padrão descritos anteriormente. Basta usá-la junto da função de submissão do formulário.

```ts
const { register, handleSubmit, watch, reset } = useForm<NewCycleFormData>({
  resolver: zodResolver(newCycleFormSchema),
  defaultValues: {
    task: '',
    minutesAmount: 0
  }
});

//...

function onHandleSubmit(data: NewCycleFormData) {
  console.log(data)
  reset();
}

// ...
```

  # Funcionalidades da Aplicação
  ## Iniciando um novo Ciclo
  Primeiro de tudo, no typescript nós precisamos dizer que formato cada ciclo possui. Dessa forma, teremos uma interface com as propriedades de cada ciclo, chamada `Cycle` e dela teremos um id para cada um dos ciclos.

```ts
// ./Home/index.tsx
interface Cycle {
  id: string,
  task: string,
  minutesAmount: number
}
```

  Dentro do nosso componente, criaremos uma variável com useState que guardará uma lista de ciclos, para que ele receba uma lista com aquele tipo colocamos um _generic_ com o _tipo_ da lista junto de "[]"
  ```ts
  const [cycles, setCycles] = useState<Cycle[]>([])
  ```
  Dessa forma estaremos iniciando uma lista de ciclos.
  
  Na nossa função de submissão do formulário `onHandleSubmit()`, nós recebemos os valores do ciclo atual e o adicionamos a lista de ciclos através de uma closure, dessa forma evitamos demais erros no nosso código.

```ts
// ./Home/index.tsx

// ...

function onHandleSubmit(data: NewCycleFormData) {
  
  const newCycle: Cycle = {
    id: String(new Date().getTime()),
    task: data.task,
    minutesAmount: data.minutesAmount
  }

  setCycles((state) => [...cycles, newCycle])
  reset();
}

// ...
```
  Uma melhor adaptação que fizemos para a aplicação é a criação de mais uma variável para recuperar o _id_ do ciclo que está em ndamento no momento. Isso nos será útil futuramente caso a gente queira verificar a duração do ciclo, se ele já terminou e monitorar o tempo dele. Nós setamos ela logo ao final da adição do novo ciclo a lista de ciclos.

```tsx
// ./Home/index.tsx
const [activeCycleId, setActiveCycleId] = useState<string | null>(null)
// ...
function onHandleSubmit(data: NewCycleFormData) {
  
  const id = String(new Date().getTime()),

  const newCycle: Cycle = {
    id,
    task: data.task,
    minutesAmount: data.minutesAmount
  }

  setCycles((state) => [...cycles, newCycle])
  setActiveCycleId(id)
  reset();
}
```
No generic da criação da nova variável acima, temos o tipo string | null, pois nem sempre existirá um ciclo em andamento.

  Para recuperar o cyclo completo que está ativo e não somente seu id é muito simples. Cria-se uma nova variável que percorre toda a lista de ciclos e recupera aquele que possui o mesmo id do ciclo atual.

```ts
const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId)
```

  ## Criando Countdown
  Iniciaremos a contagem regressiva de cada ciclo nessa parte. Aqui criamos diversas variáveis para condicionar a contagem regressiva para segundos.

  Primeiro criamos uma variável que conte a quantidade de segundos que já se passaram.

```ts
const [amountSecondsPassed, setAmountSecondsPassed] = useState(0);
```
  Em seguida, criamos uma variável para contar quantos segundos serão contados e outra para verificar quantos segundos faltam em tempo real.

  Para usar os valores dos segundos para mostrar em tela, basta usarmos a quantidade de segundos que falta atualmente e aproximamos para baixo usando o `Math.floor()` do javascript. Os segundos que sobram podemos recupera-los com o operador de resto `valor % 60`.

```ts
// ./Home/index.tsx
const totalSeconds = activeCycle ? activeCycle.minutesAmount * 60;
const currentSeconds = activeCycle ? totalSeconds - amountSecondsPassed : 0;

const minutesAmount = Math.floor(currentSeconds / 60);
const secondsAmount = currentSeconds % 60;

const minutes = String(minutesAmount).padStart(2,"0");
const seconds = String(secondsAmount).padStart(2,"0");
```
No fim, passamos o valor de _minutesAmount_ e _secondsAmount_ para string com duas casas sendo que os espaços em branco serão preenchidos por "0" usando a função `.padStart()` de String do _js_.

  Para mostrar em tela, basta abrir "{}" e colocar cada variável (minutes, seconds) dentro delas com a posição de cada número.

  ## O hook useEffect
  O useEffect é um hook do React criado com o objetivo de monitorar mudanças em uma ou mais variáveis independente da origem e sempre que elas são alteradas ele repete o seu código.

```ts
// Formato padrão do useEffect
useEffect(() => {}, [])
```
  O primeiro parâmetro é uma função que será executado em dois momentos. O primeiro, assim que a página ou componente carrega pela primeira vez, segundo momento é quando qualquer variável dentro do array que ele tem como segundo parâmetro é alterada.

  Caso não tenha nenhuma variável no array de dependências, o useEffect() executará uma única vez. Isso é ótimo geralmente pra chamadas a API.

  Agora, um caso muito importante ao usar discriminadamente o `useEffect()` é que se formos usa-lo para atualizar o valor de um estado em que esse estado depende de outras informações do componente, essa variável não necessariamente precisa ser um estado e não precisariamos usar o useEffect, basta criar uma variável com o mesmo valor dela.

  ## Reduzindo Countdown
  Reduzir uma contagem geralmente iremos prezar por usar a função `setInterval(() => {}, 1000)` que chama uma função a cada uma quantidade específica em milisegundos. Essa é uma abordagem correta de ser feita, a qual usaremos dentro de um `useEffect()`.

  Antes de tudo, para que a contagem funcione sem erros, precisamos adicionar mais uma propriedade a `startDate` que nos dá a data em que o ciclo é criado.

  Já dentro do nosso `useEffect()` dentro da Home vamos iniciar um setInterval e a utilização da variável que conta quantos segundos já se passaram.

  Para monitorar a passagem do tempo, o setInterval pode ser um pouco impreciso, por essa razão, vamos usar a função `differenceInSeconds()` da biblioteca _date-fns_ para comparar a data de início do ciclo com a data atual em tempo real em segundos.

```js
// ./Home/index.tsx
import { differenceInSeconds } from 'date-fns';
 
  // ...

useEffect(() => {
  if (activeCycle) {
    setInterval(() => {
      setAmountSecondsPassed(
        differenceInSeconds(new Date(), activeCycle.startDate),
      )
    }, 1000)
  }
}, [activeCycle])
```

  Ao chegar nessa parte da implementação a contagem regressiva já está em funcionamento, entretanto pode estar ocorrendo alguns bugs como ao aicionar novo ciclo que não exclui o anterior de continuar executando.

  Também podemos achar o bug do estado de `amountSecondsPassed` que não é resetado para 0 no início do próximo ciclo.

  Para isso, vamos reiniciar o estado da variável `amountSecondsPassed` ao se criar um novo ciclo e também reiniciar o intervalo que criamos dentro do nosso `useEffect()`.

```ts
// ./Home/index.tsx

// ...

useEffect(() => {
  let interval: number;

  if (activeCycle) {
    interval = setInterval(() => {
      setAmountSecondsPassed(
        differenceInSeconds(new Date(), activeCycle.startDate),
      )
    }, 1000)
  }

  return () => {
    clearInterval(interval)
  }
}, [activeCycle])

function handleCreateNewCycle(data: NewCycleFormData) {
  const id = String(new Date().getTime());

  const newCycle: Cycle = {
    id,
    task: data.task,
    minutesAmount: data.minutesAmount,
    startDate: new Date()
  }

  setCycles((state) => [...state, newCycle])
  setActiveCycleId(id);
  setAmountSecondsPassed();

  reset()
}

``` 
  Dentro da função de criação de um novo ciclo eu reseto a contagem de segundos contados pelo nosso estado. Junto disso, dentro do `useEffect` eu passo o intervalo para uma variável e uso o retorno do hook para ativar a função `clearInterval()` para "resetar" o `setInterval` criado anteriormente.

  Algo que ainda não foi citado aqui e que é muito interessante é que o useEffect possui um "return", que obrigatoriamente é uma função, nela podemos colocar algo que nos diga se queremos limpar o que foi feito no useEffect antes de executá-lo novamente.

  ## Mudando title da página
  Essa é só uma parte legal da aplicação que é a mudança no title para seguir a contagem do timer quando o usuário não estiver na página.

```ts
// ./Home/index.tsx

// ...

useEffect(() => {
  if(activeCycle) {
    document.title = `${minutes}:${seconds}`;
  }
}, [minutes, seconds, activeCycle])
```

  ## Interromper ciclo
  Nessa parte da aplicação, precisamos interromper um ciclo ativo. Para isso, vamos começar com a mudança no botão de início de um novo ciclo.

  Sendo assim, já vamos criar um novo componente de estilização no styled-components chamado `StopCountdownButton` que possuirá algumas características do botão de início com mudança apenas nas cores de fundo de de hover.

  Como ambos os botões possuem características semelhantes, nós podemos criar um componente base para os dois como já foi visto antes.

```ts
// ./Home/styles.ts

// ...

const BaseCountDownButton = styled.button`
  width: 100%;
  border: 0;
  border-radius: 8px;
  padding: 1rem;

  // ...

`;

export const StartCountDownButton = styled(BaseCountDownButton)`
  background: ${(props) => props.theme['green-500']};

  &:not(:disabled):hover {
    background: ${(props => props.theme['green-700'])};
  }
`;

export const StopCountDownButton = styled(BaseCountDownButton)`
  background: ${(props) => props.theme['red-500']};

  &:not(:disabled):hover {
    background: ${(props => props.theme['red-700'])};
  }
`;
```

  Usando o componente dentro da Home vamos fazer uma renderização condicional para quando tiver um ciclo ativo, aparecer o botão de interrupção e quando não tiver, aparecer o botão de início de ciclo.

```tsx
// ./Home/index.tsx

// ...

{
  activeCycle ? 
  (
    <StopCountDownButton onClick={handleInterruptCycle} type="button">
      <HandPalm size={24} />
      Interromper
    </StopCountDownButton>            
  )
  :
  (
    <StartCountDownButton disabled={isSubmitDisabled} type="submit">
      <Play size={24} />
      Começar
    </StartCountDownButton> 
  )
}
```
  Agora, para interrompermos o ciclo, vamos criar mais uma propriedade, a `interruptDate`, com ela vamos marcar a data em que o ciclo foi interrompido e assim como a `startDate` vamos colocá-la como opcional.

  Cria-se a função `handleInterruptCycle` dentro dela vamos usar a alteração de estado da lista de ciclos `setCycles` para percorrermos a lista atual e colocarmos a propriedade `interruptDate` no ciclo que está atualmente em contagem. Vamos estar usando o id desse ciclo para verificá-lo.

```ts
function hundleInterruptCycle() {
  setCycles((state) => 
    state.map((cycle) => {
      if (cycle.id === activeCycleId) {
        return { ...cycle, interruptDate: new Date() }
      } else {
        return cycle  
      }
    })
  )
  setActiveCycleId(null)
}
```
  E como ocorre a interrupção do ciclo atual, setamos a variável `activeCycleId` como null, já que o ciclo vai ser parado e não terá ciclo em andamento.

  ## Ciclo completo
  Um ciclo completo é condicionado se a quantidade de segundos que se passaram for igual ou maior que a quantidade de segundos do ciclo, sendo assim, dentro do nosso `useEffect()` estaremoss verificando essa condição.

  Verificar essa condição acarretará em algo que vamos precisar mais na frente na nossa página de histórico assim como na lógica atual. Como vamos ter tasks com o valor concluído no histórico, vamos colocar mais uma propriedade dentro do nosso tipo cycle com o nome de `finishedDate`.

```ts
// ./Home/index.tsx
interface Cycle {
  id: string,
  task: string,
  minutesAmount: number,
  startDate: Date,
  interruptDate?: Date,
  finishedDate?: Date
}
```
  E para atribuírmos o valor da propriedade opcional `finishedDate` vamos usar a mesma lógica que usamos na proprieade de interrupção.

```js
// ./Home/index.tsx

// ...

useEffect(() => {
  let interval: number;

  if (activeCycle) {
    interval = setInterval(() => {
      const secondsDifference = differenceInSeconds(
        new Date(),
        activeCycle.startDate
      )

      if (secondsDifference >== totalSeconds) {
        setCycles((state) =>
          state.map((cycle) => {
            if (cycle.id === activeCycleId) {
              return { ...cycle, finishedDate: new Date() }
            } else {
              return cycle
            }
          })
        )
        setAmountSecondsPassed(totalSeconds)

        clearInterval(interval)
      } else {
        setAmountSecondsPassed(secondsDifference)
      }
      
    }, 1000)
  }


  return () => {
    clearInterval(interval)
  }
}, [activeCycle])
```

  Adicionado a data de término do ciclo no ciclo que foi concluído também reiniciamos o intervalo de contagem dos segundos passados, mas caso o ciclo não tenha se encerrado, apenas adicionamos os segundos de diferença ao estados dos segundos que se passaram `amountSecondsPassed`.

  ## Separando componentes e Prop Drilling
  Como podemos perceber, o nosso componente Home possui muito código e diversos componentes que poderiam ser separados em pequenos componentes e deixar a página mais limpa e com melhor controle dos componentes.

  Dessa forma, nessa parte da aplicação é onde vamos separar os componentes em componentes menores.

  Existem dois momentos muito importantes em que um desenvolvedor percebe que deve-se criar um componente, o primeiro deles é quando você percebe que uma mesma estrutura irá se repetir mais de duas vezes na mesma aplicação. O segundo momento é quando percebemos que existem partes de um componente maior que podem funcionar independentes do componente em que estão, o que pode deixar o código mais limpo e mais organizado.

  Com isso tudo explicado, vamos separar o nosso componente `Home` em dois novos componentes, o `Countdown` e o `NewCycleForm`. Em seguida, vamos pegar todas as estruturas dentro de `./Home/index.tsx` e de `./Home/styles.ts` que correspondem a cada componente.

  ![Estrutura de páginas da Home](./public/imgs/componentes-a-home.png)

  Podemos passar também todas as importações. Entretando, vamos perceber uma coisa, quando passarmos todas as variáveis e funções que precisamos da Home para o Countdown e para o NewCycleForm, todas as propriedades são específicamente para comunicação entre componentes e ficam uma quantidade consideração de propriedades.

  Prop-Dilling é quando temos muitas porpriedades apenas para comunicação entre componentes. Propriedades é a principal forma de comunicação entre componentes, mas não é a única. A partir do momento em que temos que passar diversas propriedades para cada componente, o projeto fica repetitivo.

  A Context API permite compartilharmos informações com vários componentes ao mesmo tempo, ela que vamos utilizar para fazer essa comunicação com todos os componentes dessa aplicação.




  # Contexto no React
  Página exemplo para entender como funciona o Context no React:
  

```js
import { useContext, createContext, useState } from 'react';

const CycleContext = createContext({} as any)

function NewCycleForm() {
  const { activeCycle, setActiveCycle  } = useContext(CycleContext);

  return (
    <div>
      <h1>
        NewCycleForm { activeCycle }
      </h1>
      <button
        onClick={() => {
          setActiveCycle(5)
        }}
      >
        Mudar Context
      </button>
    </div>
      
  )
}

function Countdown() {
  // Form de coletar o valor da variável dentro do contexxto
  const { activeCycle} = useContext(CycleContext) 

  return (
    <h1>Countdown { activeCycle }</h1>
  )
}

export function Home() {
  const [ activeCycle, setActiveCycle ] = useState(0);

  return (
    <CycleContext.Provider value={{activeCycle, setActiveCycle}}>
      <div>
        <Countdown />
        <NewCycleForm />
      </div>
    </CycleContext.Provider>
  )
}
```

