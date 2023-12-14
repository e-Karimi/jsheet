# <i>jsheet</i>

### jsheet is a React app for writing javascript codes and Markdown texts. ( With the ability to save and share with others )

---

This project was conducted as an educational exercise to improve skills such as
<I style="background-color: lightblue;color:black;padding:0px 6px 2px ; border-radius:5px">React</i>
<I style="background-color: lightblue;color:black;padding:0px 6px 2px ; border-radius:5px">Redux</i> , and
<I style="background-color: lightblue;color:black;padding:0px 6px 2px ; border-radius:5px">TypeScript</i> . It was developed by dear master <i> <a  href="https://www.udemy.com/course/react-and-typescript-build-a-portfolio-project/" style="color:red;" >Stephen Grider</a></i> at Udemy.com.

## 🧲 Features

- Click any text cells to edit it

- The code in each code editor is all joined together into one file. If you define a variable in cell#1, you can refer it to any following cells!

- You can show any React component, string, number or anything else by calling <mark style="background-color: lightblue;color:black;padding:0px 8px 3px ; border-radius:5px"> show function</mark> . This is a function built into this environment.
  Call multiple times to show multiple values.

```bash
 show(<h1>Hi thre<h1>)     show(2)  show('string')
```

- Re-order or delete cells using the buttons on the top right

- Add new cells by clicking on the add cell and text buttons

All of your changes get saved to the file you opened jsheet with.
So if you run <mark style="background-color: lightblue;color:black; padding:0px 8px 3px ; border-radius:5px"> npx jsheet serve test.js</mark>
, all of the text and code you write will be saved to the test.js
that located in the same directory where you run command.

## 🛠️ Install

```bash
npm install jsheet
```

## 💻 Usage

```bash
npx jsheet serve
```

- Default filename is <mark style="background-color: lightblue;color:black;padding:0px 6px 3px ;"> notebook.js </mark>. which all your codes and texts are saved in.

- default port is <mark style="background-color: lightblue;color:black;padding:0px 6px 2px ;"> 4005 </mark>.

* Also you can use your favorit file and port :

```bash
npx jsheet serve [filename.js] [--port <number>]
```

## 🛠️ Technologies

- React
- Redux toolkit
- Typescript
- Esbuild
- Lerna
- Node js
- Express js
- Bulma Css

## 🙇 Acknowledgements

- <a href="https://www.udemy.com/course/react-and-typescript-build-a-portfolio-project/">React and Typescript : Build a Portfolio Project - Stephen Grider</a>
- <a href="https://readmi.xyz/">readmi.xyz</a>

## Authors

Ensiye Karimi

## Keywords

React Redux-toolkit Typescript
