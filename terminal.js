document.addEventListener("keydown", function(event) {
    if (event.keyCode === 13) {
        list = terminal.innerHTML.split('\n');
        lastLine = list[list.length - 1];
        command = lastLine.replace(prompt, '');
        if (command.length > 0)
            executeCommand(command);
        else
            addToTerminal('\n\n');
        addToTerminal(prompt);
        window.scrollTo(0, document.body.scrollHeight);
    } else if (event.keyCode >= 65 && event.keyCode <= 90) {
        addToTerminal(String.fromCharCode(event.keyCode).toLowerCase());
    } else if (event.keyCode === 32) {
        // Space
        addToTerminal(' ');
    } else if (event.keyCode === 8) {
        // Backspace
        backspace();
    } else if (event.keyCode === 189) {
        // Dash
        addToTerminal('-');
    } else if (event.keyCode === 190) {
        // Dot
        addToTerminal('.');
    } else if (event.keyCode === 38) {
        // Up
        if (history.length > 0 && historyPosition > 0) {
            historyPosition--;
            list = terminal.innerHTML.split('\n');
            list[list.length - 1] = prompt + history[historyPosition];
            terminal.innerHTML = list.join('\n');
        }
    } else if (event.keyCode === 40) {
        // Down
        if (history.length > 0 && historyPosition < history.length - 1) {
            historyPosition++;
            list = terminal.innerHTML.split('\n');
            list[list.length - 1] = prompt + history[historyPosition];
            terminal.innerHTML = list.join('\n');
        } else if (historyPosition === history.length -1) {
            historyPosition++;
            list = terminal.innerHTML.split('\n');
            list[list.length - 1] = prompt;
            terminal.innerHTML = list.join('\n');
        }
    } else {
        // Debug
        //addToTerminal(event.keyCode);
    }
});

const prompt = ' braulio@personalWeb ~% ';
let history = [];
var historyPosition = 0;
var theme = 0;

var terminal = document.getElementById('terminal');
function addToTerminal(text) {
    terminal.innerHTML += text;
}
function backspace() {
    list = terminal.innerHTML.split('\n');
    lastLine = list[list.length - 1];
    if (lastLine != prompt) {
        terminal.innerHTML = terminal.innerHTML.replace(/.$/, '');
    }
}
function executeCommand(command) {
    addToTerminal('\n\n');
    switch (command) {
        case 'clear':
            terminal.innerHTML = '';
            break;
        case 'exit':
            window.location.href = 'https://www.google.com';
            break;
        case 'help':
            addToTerminal(` Available commands:
 - clear            - exit           - help
 - history          - ls             - open [file]
 - pwd              - reset          - theme
 - time`);
            addToTerminal('\n\n');
            break;
        case 'history':
            history.forEach(element => addToTerminal(' ' + element + '\n'));
            addToTerminal('\n');
            break;
        case 'ls':
            addToTerminal(` contact               degree-project             linkedin
 master-project        send-message.py`);
            addToTerminal('\n\n');
            break;
        case 'open contact':
        addToTerminal(` Contact info:
 -> brauliomendezagra@gmail.com
 -> https://www.linkedin.com/in/brauliomendez`);
            addToTerminal('\n\n');
            break;
        case 'open degree-project':
            window.location.href = 'http://hdl.handle.net/2183/24115';
            break;
        case 'open linkedin':
            window.location.href = 'https://www.linkedin.com/in/brauliomendez';
            break;
        case 'open master-project':
            window.location.href = 'https://drive.google.com/file/d/13_WmXTYeoJLyw1fGWgr_TdNka_wqI0lv/view?usp=sharing';
            break;
        case 'open send-message.py':
            addToTerminal(' Usage: send-message.py [text]');
            addToTerminal('\n\n');
            break;
        case 'pwd':
            addToTerminal(' /home/braulio/Desktop');
            addToTerminal('\n\n');
            break;
        case 'reset':
            history = [];
            historyPosition = 0;
            theme = 0;
            document.body.style.background = 'rgb(0, 0, 50)';
            document.getElementById('terminal').style.color = 'rgb(0, 255, 0)';
            terminal.innerHTML = '';
            break;
        case 'send-message.py':
            addToTerminal(' Usage: send-message.py [text]');
            addToTerminal('\n\n');
            break;
        case 'theme':
            if (theme < 4)
                theme++
            else
                theme = 0;
            switch (theme) {
                case 0:
                    document.body.style.background = 'rgb(0, 0, 50)';
                    document.getElementById('terminal').style.color = 'rgb(0, 255, 0)';
                    break;
                case 1:
                    document.body.style.background = 'green';
                    document.getElementById('terminal').style.color = 'white';
                    break;
                case 2:
                    document.body.style.background = 'purple';
                    document.getElementById('terminal').style.color = 'red';
                    break;
                case 3:
                    document.body.style.background = 'yellow';
                    document.getElementById('terminal').style.color = 'blue';
                    break;
                case 4:
                    document.body.style.background = 'blue';
                    document.getElementById('terminal').style.color = 'orange';
                    break;
            }
            break;
        case 'time':
            var today = new Date();
            var day = String(today.getDate()).padStart(2, '0');
            var month = String(today.getMonth() + 1).padStart(2, '0');
            var year = today.getFullYear();
            var hour = String(today.getHours()).padStart(2, '0');
            var minutes = String(today.getMinutes()).padStart(2, '0');
            var seconds = String(today.getSeconds()).padStart(2, '0');
            addToTerminal(' ' + day + '/' + month + '/' + year + ' ' + hour + ':' + minutes + ':' + seconds);
            addToTerminal('\n\n');
            break;
        default:
            if (command.split(' ')[0] === 'open')
                addToTerminal(' This file does not exist.');
            else if (command.split(' ')[0] === 'send-message.py') {
                text = command.replace('send-message.py ', '');
                //var xhr = new XMLHttpRequest();
                //xhr.open("POST", 'https://api.telegram.org/bot1238188214:AAGPfHYlFsievMecrClrG3I8oFBYokcqqBs/sendMessage');
                addToTerminal(' Message sent');
            } else
                addToTerminal(' Unknown command, type \'help\' to see the options.');
            addToTerminal('\n\n');
    }
    var index = history.findIndex((element) => element === command);
    if (index > -1)
        history.splice(index, 1);
    history.push(command);
    historyPosition = history.length;
}

var today = new Date();
var day = String(today.getDate()).padStart(2, '0');
var month = String(today.getMonth() + 1).padStart(2, '0');
var year = today.getFullYear();
var hour = String(today.getHours()).padStart(2, '0');
var minutes = String(today.getMinutes()).padStart(2, '0');
var seconds = String(today.getSeconds()).padStart(2, '0');
addToTerminal('     ' + day + '/' + month + '/' + year + ' ' + hour + ':' + minutes + ':' + seconds + '\n\n');
addToTerminal('     Type \'help\' if you need it.\n\n')
addToTerminal(prompt)