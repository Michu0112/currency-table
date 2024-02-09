import RowComponent from './row-component.js';

class CurrencyTable {
	constructor() {
		this.table = document.querySelector('.currency-container__table');
		this.currencies = {};
	}

	async init() {
		await this.fetchCurrencies();
		this.renderTable();
	}

	async fetchCurrencies() {
		const response = await fetch(
			'https://api.nbp.pl/api/exchangerates/tables/A/today?format=json'
		);
		const currencies = await response.json();

		currencies[0].rates.forEach((rate) => {
			this.currencies[rate.code] = rate.mid;
		});
	}

	renderTable() {
		const tbody = document.createElement('tbody');

		for (const currency in this.currencies) {
			const row = document.createElement('tr');
			this.currencyRate = this.currencies[currency].toFixed(4);

			row.appendChild(this.createCell(currency, false));
			row.appendChild(this.createCell(this.currencyRate, true));
			row.appendChild(this.createCellAction());

			this._initializeRowComponent(row, {
				currentCurrencyRate: this.currencyRate,
				currencyCode: currency,
			});

			tbody.appendChild(row);
		}

		this.currencyRate = null;
		this.table.appendChild(tbody);
	}

	_initializeRowComponent(row, options) {
		const rowComponent = new RowComponent(row, options);
		rowComponent.init();
	}

	createCell(text, appendInput) {
		const cell = document.createElement('td');
		cell.textContent = text;

		if (appendInput) {
			const input = this.createInput();
			cell.appendChild(input);
			cell.appendChild(this.createActionIndicators());
		}
		return cell;
	}

	createActionIndicators() {
		return document
			.querySelector('.currency-indicators')
			.content.cloneNode(true);
	}

	createCellAction() {
		const cell = document.createElement('td');

		cell.appendChild(
			document
				.querySelector('.currency-rate-edit-template')
				.content.cloneNode(true)
		);

		return cell;
	}

	createInput() {
		const input = document.createElement('input');
		input.setAttribute('type', 'number');
		input.setAttribute('name', 'currencyRate');
		input.setAttribute('min', 0.001);
		input.value = Number(this.currencyRate);
		input.classList.add('not-shown');

		return input;
	}
}

const currencyTableClass = new CurrencyTable();
currencyTableClass.init();
