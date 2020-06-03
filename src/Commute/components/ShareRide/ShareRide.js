import React from 'react'
import { observable, action } from 'mobx'
import { observer ,inject} from 'mobx-react'

import { Typo20DarkBlueGreyHKGrotestBold as FormHeadingText } from '../../styleGuides/StyleGuides.js'
import {
   Form,
   FormDashboard
} from '../../styledComponents/styleComponents.js';


import { withRouter } from 'react-router-dom'
import {withHeader} from '../../Hocs/withHeader';

import { InputField } from '../Common/components/InputField.js'
import { DateAndTime } from '../Common/components/DateTime.js'
import { Button } from '../Common/components/Button.js'
import { DisplayListOfElements } from '../Common/components/DisplayListOfElements.js'
import { FlexibleDateTime } from '../Common/components/FlexibleDateTime.js'

import {
   CheckBox,
   FlexibleTimings,
   FlexibleTimingsLabel
} from './styledComponents.js'

import strings from '../../i18n/strings.json'
@inject('commuteStore')
@observer
class ShareRide extends React.Component {
   @observable isCheckedFlexibleTimings
   @observable displayError
   @observable from
   @observable to
   @observable dateTime
   @observable startDateTime
   @observable endDateTime
   @observable seats
   @observable luggages
   constructor(props) {
      super(props)
      this.init()
   }
   @action.bound
   init() {
      this.isCheckedFlexibleTimings = false
      this.displayError = false
      this.from = ''
      this.to = ''
      this.dateTime = ''
      this.startDateTime = ''
      this.endDateTime = ''
      this.seats = 0
      this.luggages = 0
   }
   onClickFlexibleTimings = () => {
      this.isCheckedFlexibleTimings = !this.isCheckedFlexibleTimings
   }
   onChangeRequestFrom = event => {
      this.from = event.target.value
      this.displayError = false
   }
   onChangeRequestTo = event => {
      this.to = event.target.value
      this.displayError = false
   }
   onChangeTime = time => {
      this.dateTime = time
   }
   onChangeFromTime = time => {
      this.startDateTime = time
   }
   onChangeToTime = time => {
      this.endDateTime = time
   }
   onChangeNoOfSeats = seats => {
      this.seats = seats
   }
   onChangeNoOfLuggages = luggages => {
      this.luggages = luggages
   }
   onSubmitRequest = () => {
      this.displayError = true
      const { commuteStore:{shareRideInfo} } = this.props
      let formDetails = [
         this.from,
         this.to,
         this.dateTime,
         this.seats,
         this.luggages
      ]
      let count = 0
      formDetails.forEach(eachDetail => {
         if (eachDetail.length === 0 || eachDetail === 0) {
            count++
         }
      })
      if (!this.isCheckedFlexibleTimings) {
         if (count === 0 && this.dateTime.length !== 0) {
            alert('Submitted Succesfully')
            this.displayError = false
            const shareRideData = {
               from: this.from,
               to: this.to,
               isFlexible: false,
               dateTime: this.dateTime,
               seats: this.seats,
               luggages: this.luggages
            }
            this.init()

            shareRideInfo(shareRideData)
         }
      } else {
         if (
            count === 0 &&
            this.startDateTime.length !== 0 &&
            this.endDateTime.length !== 0
         ) {
            alert('Submitted Succesfully')
            this.displayError = false
            const shareRideData = {
               from: this.from,
               to: this.to,
               isFlexible: true,
               startDateTime: this.startDateTime,
               endDateTime: this.endDateTime,
               seats: this.seats,
               luggages: this.luggages
            }
            this.init()
            shareRideInfo(shareRideData)
         }
      }
   }
   render() {
      const {
         from,
         to,
         dateTime,
         startDateTime,
         endDateTime,
         seats,
         luggages,
         isCheckedFlexibleTimings,
         onClickFlexibleTimings,
         onSubmitRequest,
         onChangeRequestFrom,
         onChangeRequestTo,
         displayError,
         onChangeTime,
         onChangeFromTime,
         onChangeToTime,
         onChangeNoOfSeats,
         onChangeNoOfLuggages
      } = this

      return (
         <FormDashboard>
         <Form>
            <FormHeadingText>{strings.text.shareRide}</FormHeadingText>
            <InputField
               placeholderText={strings.placeholderText.ex}
               type={strings.type.text}
               label={strings.label.from}
               onChange={onChangeRequestFrom}
               value={from}
               displayError={displayError}
            />
            <InputField
               placeholderText={strings.placeholderText.ex}
               type={strings.type.text}
               label={strings.label.to}
               onChange={onChangeRequestTo}
               value={to}
               displayError={displayError}
            />
            {isCheckedFlexibleTimings ? (
               <FlexibleDateTime
                  onChangeFromTime={onChangeFromTime}
                  onChangeToTime={onChangeToTime}
                  startDateTime={startDateTime}
                  endDateTime={endDateTime}
                  displayError={displayError}
               />
            ) : (
               <DateAndTime
                  label={strings.label.dateAndTime}
                  onChangeTime={onChangeTime}
                  dateAndTime={dateTime}
                  displayError={displayError}
               />
            )}
            <FlexibleTimings>
               <CheckBox
                  type={strings.type.checkbox}
                  onClick={onClickFlexibleTimings}
               />
               <FlexibleTimingsLabel>
                  {strings.label.flexibleTimings}
               </FlexibleTimingsLabel>
            </FlexibleTimings>
            <DisplayListOfElements
               listData={{ title: strings.text.noOfSeatsAvailable }}
               onChange={onChangeNoOfSeats}
               displayError={displayError}
               intial={seats}
            />
            <DisplayListOfElements
               listData={{ title: strings.text.noOfLuggages }}
               onChange={onChangeNoOfLuggages}
               displayError={displayError}
               intial={luggages}
            />
            <Button
               buttonText={strings.text.shareText}
               onClickFunction={onSubmitRequest}
            />
         </Form>
         </FormDashboard>
      )
   }
}
export default withRouter(withHeader(ShareRide));
