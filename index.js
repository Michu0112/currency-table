class CurrencyTable {
	constructor() {
		this.input = document.querySelector('#numberInput');
		this.table = document.querySelector('.currency-container__table');
		this.currencySelect = document.querySelector('#currencySelect');
		this.indicatorUp = document.querySelector('.currency-indicator-up');
		this.indicatorDown = document.querySelector('.currency-indicator-down');
		this.indicatorEqual = document.querySelector(
			'.currency-indicator-equal'
		);
		this.chosenCurrency = '';

		this.currencies = {
			EUR: 4.67,
			USD: 4.99,
			GBY: 3.0,
		};
	}

	async init() {
		await this.fetchCurrencies();
		this.renderOptions();
		this.renderTable();
		this._registerEvents();
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

	_registerEvents() {
		this.input.addEventListener('input', this.onInput.bind(this));
		this.currencySelect.addEventListener(
			'change',
			this.onChange.bind(this)
		);
	}

	onChange(e) {
		this.chosenCurrency = e.target.value;
		this.resetInput();
	}

	onInput(e) {
		this.value = e.target.value;
		this.value ? this.showIndicator() : this.hideIndicator();
	}

	resetInput() {
		this.input.value = '';
		this.hideIndicator();
	}

	showIndicator() {
		const inputGreater =
			this.getNumberInput() > this.getChosenCurrencyValue();
		const inputEqual =
			this.getNumberInput() === this.getChosenCurrencyValue();

		if (inputGreater) {
			this.toggleIndicatorUp(true);
			return;
		}

		if (inputEqual) {
			this.toggleIndicatorEqual(true);
			return;
		}

		this.toggleIndicatorDown(true);
	}

	hideIndicator() {
		this.toggleIndicatorUp();
		this.toggleIndicatorDown();
		this.toggleIndicatorEqual();
	}

	toggleIndicatorUp(toggle) {
		if (toggle) {
			this.indicatorUp.classList.remove('hidden');
			this.toggleIndicatorDown();
			this.toggleIndicatorEqual();
			return;
		}

		this.indicatorUp.classList.add('hidden');
	}

	toggleIndicatorDown(toggle) {
		if (toggle) {
			this.indicatorDown.classList.remove('hidden');
			this.toggleIndicatorEqual();
			this.toggleIndicatorUp();
			return;
		}

		this.indicatorDown.classList.add('hidden');
	}

	toggleIndicatorEqual(toggle) {
		if (toggle) {
			this.indicatorEqual.classList.remove('hidden');
			this.toggleIndicatorDown();
			this.toggleIndicatorUp();
			return;
		}

		this.indicatorEqual.classList.add('hidden');
	}

	renderOptions() {
		let iterations = 0;
		for (const currency in this.currencies) {
			const option = document.createElement('option');
			option.text = currency;
			option.value = currency;
			this.currencySelect.add(option);
			iterations === 0 ? this.setAsSelected(option) : '';
			iterations++;
		}
	}

	renderTable() {
		const tbody = document.createElement('tbody');

		for (const currency in this.currencies) {
			const row = document.createElement('tr');

			const cellTitle = document.createElement('td');
			cellTitle.textContent = currency;
			row.appendChild(cellTitle);

			const cellValue = document.createElement('td');
			cellValue.textContent = this.currencies[currency].toFixed(4);
			row.appendChild(cellValue);

			tbody.appendChild(row);
		}

		this.table.appendChild(tbody);
	}

	setAsSelected(option) {
		this.chosenCurrency = option.value;
		option.setAttribute('selected', true);
	}

	getNumberInput() {
		return Number(this.value);
	}

	getChosenCurrencyValue() {
		return this.currencies[this.chosenCurrency];
	}
}

const currencyTableClass = new CurrencyTable();
currencyTableClass.init();
