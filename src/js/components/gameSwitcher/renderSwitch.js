export default function renderSwitch() {
    const switcher = document.createElement('div');
    switcher.className = 'games-switcher';

    switcher.innerHTML = `
        <div class="games-switcher__title">Мои слова</div> 
        <label class="switch">
            <input type="checkbox" checked="">
            <span class="slider"></span>
        </label>`;
   
    return switcher;
}