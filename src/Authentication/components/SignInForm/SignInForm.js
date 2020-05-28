
import React from 'react';
import {observer} from 'mobx-react';

import {FormType,FormDashBoard,LoginLink,LogInPageLink,PasswordAlert,LogoImageContainer} from './styledComponents.js';
import {FormHeading} from '../../styledComponents';

import {InputField,LogoImage} from '../../../Common/components';
import {Button} from '../../../Common/components/Button.js';
import strings from '../../i18n/strings.json';

@observer
class SignInForm extends React.Component{
    render(){
        const {userName,
                password,
                confirmPassword,
                mobileNumber,
                choosePassword,
                onChangeUserName,
                onChangePassword,
                onChangeMobileNumber,
                onChangeConfirmPassword,
                onSubmit,
                displayError}=this.props;
        return (
            <FormDashBoard>
                <FormType >
                    <LogoImageContainer>
                        <LogoImage />
                    </LogoImageContainer>
                    <FormHeading >{strings.signUpFormHeading}</FormHeading>
                    <InputField value={userName} onChange={onChangeUserName} type={'text'} placeholderText={'Username'} displayError={displayError} label={'USERNAME'}/>
                    <InputField value={password} onChange={onChangePassword} type={'password'} placeholderText={'Password'} displayError={displayError} label={"PASSWORD"}/>
                    <InputField value={confirmPassword} onChange={onChangeConfirmPassword} type={'password'} placeholderText={'Confirm Password'} displayError={displayError} label={'CONFIRM PASSWORD'}/>
                    <InputField value={mobileNumber} onChange={onChangeMobileNumber} type={'text'} placeholderText={'Mobile Number'} displayError={displayError} label={'MOBILE NUMBER'}/>
                    {choosePassword.length!==0?<PasswordAlert clasName='text'>{choosePassword}</PasswordAlert>:''}
                    <Button buttonText={strings.signUp} onClickFunction={onSubmit}/>
                    <LoginLink>{strings.logInLink}  &nbsp; <LogInPageLink href="/login-page">  &nbsp;{strings.logInLinkText}</LogInPageLink></LoginLink>
                </FormType>
            </FormDashBoard>
            );
    }
}
export default SignInForm;