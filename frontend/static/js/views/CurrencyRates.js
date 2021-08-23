import AbstractView from "./AbstractView.js";
import { getResources } from "../services/services.js";

export default class extends AbstractView {
  constructor() {
    super();
    this.setTitle("Current currency rates");
  }

  converter(curr, targ) {
    return curr / targ;
  }

  async getHtml() {
    return /*html*/ `
        <div class="table-block">
            <table class="currency-table">
                <thead>
                    <tr>
                        <th>Currency Name</th>
                        <th>Letter Code</th>
                        <th>Currency</th>
                        <th>Previous Currency</th>
                    </select>

                    </tr>
                </thead>

            </table>
        </div>
        `;
  }

  async executeViewScript() {
    const valuteTable = document.querySelector(".currency-table"),
    valutes = await getResources("https://www.cbr-xml-daily.ru/daily_json.js");
    const currencies = await Object.values(valutes.Valute);

    currencies.forEach(({ Name, NumCode, CharCode, Value, Previous }) => {
        const element = document.createElement("tbody");
        element.classList.add('currency-table');
        element.innerHTML = /*html*/ `
            <tr>
                <td>${Name}</td>
                <td>${CharCode}</td>
                <td>${Value}</td>
                <td>${Previous}</td>
            </tr>
        `;
        valuteTable.append(element);
    });
  }
}
