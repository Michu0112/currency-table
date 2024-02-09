export default class RowComponent {
	constructor(el, options) {
		this.el = el;
		this.options = options;
		this.input = this.el.querySelector('[name="currencyRate"]');
		this.editIcon = this.el.querySelector('.currency-rate-edit');
		this.indicatorUp = this.el.querySelector('.currency-indicator-up');
		this.indicatorDown = this.el.querySelector('.currency-indicator-down');
		this.indicatorEqual = this.el.querySelector(
			'.currency-indicator-equal'
		);
	}

	init() {
		this._registerEvents();
	}

	_registerEvents() {
		this.editIcon.addEventListener('click', this.editRow.bind(this));
		this.input.addEventListener('input', this.compareValues.bind(this));
	}

	compareValues() {
		const inputValue = this.input.value;
		const previousInputValue = this.options.currentCurrencyRate;
		const isCurrentValueBigger = inputValue > previousInputValue;
		const isCurrentValueEqual = inputValue === previousInputValue;

		if (isCurrentValueBigger) {
			this.indicateBiggerValue();
		} else if (isCurrentValueEqual) {
			this.indicateEqualValue();
		} else {
			this.indicateSmallerValue();
		}
	}

	indicateBiggerValue() {
		this.indicatorUp.classList.remove('not-shown');
		this.indicatorDown.classList.add('not-shown');
		this.indicatorEqual.classList.add('not-shown');
	}

	indicateEqualValue() {
		this.indicatorUp.classList.add('not-shown');
		this.indicatorDown.classList.add('not-shown');
		this.indicatorEqual.classList.remove('not-shown');
	}

	indicateSmallerValue() {
		this.indicatorUp.classList.add('not-shown');
		this.indicatorDown.classList.remove('not-shown');
		this.indicatorEqual.classList.add('not-shown');
	}
	clearIndicators() {
		this.indicatorUp.classList.add('not-shown');
		this.indicatorDown.classList.add('not-shown');
		this.indicatorEqual.classList.add('not-shown');
	}

	editRow() {
		this.toggleInput();
		this.clearIndicators();
	}

	toggleInput() {
		this.input.classList.toggle('not-shown');
	}
}
