import AbstractView from "./AbstractView.js";
import { getResources } from "../services/services.js";

export default class extends AbstractView {
  constructor() {
    super();
    this.setTitle("Converter");
  }

  async getHtml() {
    return /*html*/ `
        <h1>Welcome back, Dom</h1>
        <div class='block-wrapper'>
          <div class="block">
            <input id="CurrencyCommand" placeholder = 'Example: RUS to USD'>
          </div>
          <div class="block">
          <div id="result">Display result here</div>
        </div>
        <button>CLICK</button>
        `;
  }

  currencyParcer(input) {
    const values = input.match(/(\d+)/g),
      names = input.match(/\b[A-Z]{3}/g);
    const result = {};
    if (!names || names.length < 2) {
      return false;
    }
    if (!values) {
      names.forEach((name) => (result[name] = 1));
    } else {
      names.forEach((key, i) => (result[key] = values[i]));
    }
    return result;
  }

  fillUndefined(result, value = 1) {
    for (let prop in result) {
      if (result[prop] === undefined) {
        result[prop] = value;
      }
    }
    return result;
  }

  // calcCurrency(amount,current,target, nominal){

  // }

  async executeViewScript() {
    const input = document.querySelector("input"),
      resultBlock = document.getElementById("result"),
      currencies = await getResources(
        "https://www.cbr-xml-daily.ru/daily_json.js"
      ),
      valuteList = currencies.Valute;
    console.log(valuteList);
    valuteList.RUS = { Value: 1 };
    input.addEventListener("input", () => {
      const parcedInput = this.fillUndefined(this.currencyParcer(input.value));

      if (!parcedInput) {
        input.style.border = "1px solid red";
      } else {
        const current = Object.keys(parcedInput);
        const calculationResult =
          (parcedInput[current[0]] * valuteList[current[0]].Value) /
          valuteList[current[1]].Value;
        resultBlock.innerHTML = calculationResult.toFixed(2);
      }
    });
  }
}
