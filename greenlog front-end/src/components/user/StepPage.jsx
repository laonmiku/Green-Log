import React, { useRef, useState } from 'react';
import { Stepper } from 'primereact/stepper';
import { StepperPanel } from 'primereact/stepperpanel';
import { Button } from 'primereact/button';
import JoinPage from './JoinPage';
import TermsOfService from './TermsOFService';

const StepPage = () => {
    const stepperRef = useRef(null);
    const [agree, setAgree] = useState(false);

    const onClickAgree = () => {
        setAgree(true);
    };

    const buttonStyle = {
        marginTop: '1rem',
        display: 'block',
        marginLeft: 'auto',
        marginRight: 'auto',
    };

    const goToNextStep = () => {
        if (stepperRef.current) {
            stepperRef.current.nextCallback();
        }
    };

    const goTologin=()=>{
        window.location.href="/user/login"
    }

    return (
        <div className="card flex justify-content-center" style={{ width: '100%', margin: '0 auto' }}>
            <Stepper ref={stepperRef}>
                <StepperPanel header="이용약관 확인">
                    <div className="flex flex-column h-12rem">
                        <div className="border-2 border-dashed surface-border border-round surface-ground flex-auto flex justify-content-center align-items-center font-medium">
                            <TermsOfService onAgree={onClickAgree} agree={agree} />
                        </div>
                    </div>
                    <div className="flex pt-4 justify-content-center">
                        <Button
                            label="다음"
                            icon="pi pi-arrow-right"
                            iconPos="right"
                            onClick={() => stepperRef.current.nextCallback()}
                            disabled={!agree}
                            style={buttonStyle}
                            className="p-button-primary"
                        />
                    </div>
                </StepperPanel>
                <StepperPanel header="회원정보 입력">
                    <div className="flex flex-column h-12rem">
                        <div className="border-2 border-dashed surface-border border-round surface-ground flex-auto flex justify-content-center align-items-center font-medium">
                            <JoinPage onNextStep={goToNextStep} />
                        </div>
                    </div>

                </StepperPanel>

                <StepperPanel header="회원가입 완료">
                    <div className="flex flex-column h-12rem">
                        <div className="flex flex-column align-items-center justify-content-center flex-auto">
                            <img
                                src="/images/intro.png" // Update this with your image path
                                alt="Registration Complete"
                                style={{ maxWidth: '100%', height: 'auto', borderRadius: '8px' }}
                                className="mb-4"
                            />
                            <div className="border-2 border-dashed surface-border border-round surface-ground flex-auto flex justify-content-center align-items-center font-medium text-center">
                            </div>
                        </div>
                    </div>
                    <div className="flex pt-4 justify-content-center">
                        <Button
                            label="로그인하러가기"
                            severity="secondary"
                            onClick={goTologin}
                            style={buttonStyle}
                        />
                    </div>
                </StepperPanel>
            </Stepper>
        </div>
    );
}

export default StepPage;
