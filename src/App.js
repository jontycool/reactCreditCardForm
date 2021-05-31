import React, { useState } from 'react';
import Select from 'react-select';
import './App.scss';
import { ccFormat, getCardType } from './utils/cardTypes';
import { monthOptions, yearOptions } from './utils/misc';

const customStyles = {
  control: (provided, state) => ({
    ...provided,
    background: '#fff',
    borderColor: '#9e9e9e',
    minHeight: '35px',
    height: '35px',
    boxShadow: state.isFocused ? null : null,
  }),

  valueContainer: (provided, state) => ({
    ...provided,
    height: '35px',
    padding: '0 6px',
  }),

  input: (provided, state) => ({
    ...provided,
    margin: '0px',
  }),
  indicatorSeparator: (state) => ({
    display: 'none',
  }),
  indicatorsContainer: (provided, state) => ({
    ...provided,
    height: '35px',
  }),
};

function App() {
  const [cardNumber, setCardNumber] = useState('');
  const [cardName, setCardName] = useState('');
  const [expiryMonth, setExpiryMonth] = useState();
  const [expiryYear, setExpiryYear] = useState();
  const [expiryMonthCard, setExpiryMonthCard] = useState('MM');
  const [expiryYearCard, setExpiryYearCard] = useState('YY');
  const [cvv, setCvv] = useState('');
  const [cardType, setCardType] = useState('');

  const handleCardNumberChange = (event) => {
    let regex = /^[0-9\b]+$/; //regex for allowing only numbers
    let formattedValue = ccFormat(event.target.value);
    let unformattedValue = formattedValue.replace(/ /g, '');

    if (!regex.test(unformattedValue)) {
      unformattedValue = unformattedValue.slice(0, -1);
      formattedValue = formattedValue.slice(0, -1);
    }

    let tempCardType = getCardType(unformattedValue);

    if (tempCardType !== '') {
      setCardType(tempCardType);

      if (tempCardType === 'AMEX') {
        //Character Limit of 15 Digits for AMEX
        if (unformattedValue.length > 15) {
          formattedValue = formattedValue.slice(0, -1);
          unformattedValue = unformattedValue.slice(0, -1);
        } else if (unformattedValue.length >= 15) {
          formattedValue = unformattedValue.replace(/\b(\d{4})(\d{6})(\d{5})\b/, '$1 $2 $3');
        }
      } else if (unformattedValue.length > 16) {
        //Character Limit of 16 Digits for other card types
        formattedValue = formattedValue.slice(0, -1);
        unformattedValue = unformattedValue.slice(0, -1);
      }
    }

    setCardNumber(formattedValue);
  };

  const handleCardNameChange = (event) => {
    let value = event.target.value;
    //Only 20 Characters are allowed for the name
    value = value.length > 20 ? value.slice(0, 20) : value;
    setCardName(value);
  };

  const handleExpiryMonthChange = (val) => {
    setExpiryMonth(val);
    setExpiryMonthCard(val.value);
  };

  const handleExpiryYearChange = (val) => {
    setExpiryYear(val);
    let x = val.value.toString().slice(-2);
    setExpiryYearCard(x);
  };

  const handleCvvChange = (event) => {
    let value = event.target.value;
    if (value.length >= 4) {
      if (cardType === 'AMEX') {
        value = value.slice(0, 4);
      } else {
        value = value.slice(0, 3);
      }
    }
    setCvv(value);
  };

  const rotateCard = () => {
    document.querySelector('.cardContainer').classList.add('onCVV');
  };

  const rotateCardBack = () => {
    document.querySelector('.cardContainer').classList.remove('onCVV');
  };

  const handleSubmit = () => {
    console.log('Card Number ->', cardNumber);
    console.log('Card Name ->', cardName);
    console.log('Card Expiry Month ->', expiryMonth);
    console.log('Card Expiry Year ->', expiryYearCard);
    console.log('CVV ->', cvv);
  };

  return (
    <div className='App'>
      <div className='formContainer'>
        <div className='formBody'>
          <div className='cardContainer'>
            <div className='cardBody'>
              <div className='cardBodyFront'>
                <div className='cardChip'></div>
                <div className={`cardType ${cardType}`}></div>
                <div className='cardNumber'>
                  <p>{cardNumber}</p>
                </div>
                <div className='cardName'>
                  <div className='fieldText'>Card Holder</div>
                  <p>{cardName}</p>
                </div>
                <div className='cardExpiry'>
                  <div className='fieldText'>Expires</div>
                  <div>
                    <span>{expiryMonthCard}</span>
                    <span>/</span>
                    <span>{expiryYearCard}</span>
                  </div>
                </div>
              </div>
              <div className='cardBodyBack'>
                <div className='blackBar'></div>
                <div className='cvvSection'>
                  <div className='fieldText'>CVV</div>
                  <input type='password' className='cvvValue' value={cvv} readOnly />
                </div>
                <div className={`cardType ${cardType}`}></div>
              </div>
            </div>
          </div>
          <div className='cardNumberInputSection'>
            <p className='inputLabel'>Card Number</p>
            <input
              name='CardNumber'
              type='text'
              value={cardNumber}
              onChange={handleCardNumberChange}
            />
          </div>
          <div className='cardNameInputSection'>
            <p className='inputLabel'>Card Name</p>
            <input name='CardName' type='text' value={cardName} onChange={handleCardNameChange} />
          </div>
          <div className='cardInfoSection'>
            <div className='expiryInputSection'>
              <p className='inputLabel'>Expiration Date</p>
              <div className='selectContainer'>
                <Select
                  options={monthOptions}
                  className='monthPickerSelect'
                  classNamePrefix='monthPicker'
                  value={expiryMonth}
                  onChange={(option) => handleExpiryMonthChange(option)}
                  placeholder='Month'
                  styles={customStyles}
                />
                <Select
                  options={yearOptions}
                  className='yearPickerSelect'
                  classNamePrefix='yearPicker'
                  value={expiryYear}
                  onChange={(option) => handleExpiryYearChange(option)}
                  placeholder='Year'
                  styles={customStyles}
                />
              </div>
            </div>
            <div className='cvvInputSection'>
              <p className='inputLabel'>CVV</p>
              <input
                type='password'
                value={cvv}
                onChange={handleCvvChange}
                onFocus={rotateCard}
                onBlur={rotateCardBack}
              />
            </div>
          </div>
          <button className='submitButton' onClick={handleSubmit}>
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
