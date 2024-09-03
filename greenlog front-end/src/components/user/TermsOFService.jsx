import React from 'react';
import { Panel } from 'primereact/panel';
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';

const TermsOfService = ({ onAgree }) => {
    const panelStyle = {
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        borderRadius: '12px',
        backgroundColor: '#ffffff',
    };

    const cardStyle = {
        padding: '2rem',
        borderRadius: '12px',
        boxShadow: '0 1px 4px rgba(0, 0, 0, 0.1)',
        backgroundColor: '#f9f9f9',
    };

    const buttonStyle = {
        marginTop: '1rem',
        display: 'block',
        marginLeft: 'auto',
        marginRight: 'auto',
    };

    const headingStyle = {
        fontSize: '1.2rem',
        fontWeight: '600',
        marginTop: '1rem',
        marginBottom: '0.5rem',
    };

    const paragraphStyle = {
        fontSize: '1rem',
        marginBottom: '1rem',
        lineHeight: '1.6',
        color: '#333333',
    };

    return (
        <div style={{ width: '80%', maxWidth: '900px', margin: '0 auto' }}>
            <Panel header="이용 약관" style={panelStyle}>
                <Card style={cardStyle}>
                    <h2 style={{ textAlign: 'center', color: '#007ad9', marginBottom: '2rem' }}>서비스 이용 약관</h2>
                    <section>
                        <h3 style={headingStyle}>1. 소개</h3>
                        <p style={paragraphStyle}>서비스의 목적과 기능은 "초록"의 웹사이트에서 확인하실 수 있습니다.</p>
                    </section>
                    <section>
                        <h3 style={headingStyle}>2. 서비스 이용</h3>
                        <p style={paragraphStyle}>서비스 제공, 이용 자격에 관한 내용입니다.</p>
                    </section>
                    <section>
                        <h3 style={headingStyle}>3. 이용자의 의무</h3>
                        <p style={paragraphStyle}>계정 정보, 금지된 행위에 관한 내용입니다.</p>
                    </section>
                    <section>
                        <h3 style={headingStyle}>4. 지적 재산권</h3>
                        <p style={paragraphStyle}>서비스 및 그에 포함된 모든 콘텐츠, 상표, 로고, 소프트웨어 등은 "초록"의 지적 재산권에 속합니다.</p>
                    </section>
                    <section>
                        <h3 style={headingStyle}>5. 개인정보 보호</h3>
                        <p style={paragraphStyle}>"초록"은 이용자의 개인정보를 보호하며, 개인정보 처리방침을 통해 수집, 이용, 저장 및 보호 방법을 명시합니다.</p>
                    </section>
                    <section>
                        <h3 style={headingStyle}>6. 서비스의 변경 및 중단</h3>
                        <p style={paragraphStyle}>서비스의 내용, 기능, 요금 등을 변경하거나 서비스를 일시적으로 중단할 수 있습니다.</p>
                    </section>
                    <section>
                        <h3 style={headingStyle}>7. 면책 조항</h3>
                        <p style={paragraphStyle}>"초록"은 서비스의 이용과 관련하여 발생할 수 있는 직간접적인 손해에 대해 책임을 지지 않습니다.</p>
                    </section>
                    <section>
                        <h3 style={headingStyle}>8. 약관의 변경</h3>
                        <p style={paragraphStyle}>본 약관은 언제든지 변경될 수 있으며, 변경 사항은 웹사이트에 공지됩니다.</p>
                    </section>
                    <section>
                        <h3 style={headingStyle}>9. 분쟁 해결</h3>
                        <p style={paragraphStyle}>본 약관과 관련된 분쟁은 [귀하의 관할권]의 법률에 따라 해결됩니다.</p>
                    </section>
                    <section>
                        <h3 style={headingStyle}>10. 연락처</h3>
                        <p style={paragraphStyle}>서비스와 관련된 문의는 다음 연락처로 해주시기 바랍니다:<br />
                            - 이메일: support@chogrok.com<br />
                            - 주소: [회사 주소]</p>
                    </section>
                </Card>
                <Button
                    label="동의합니다"
                    icon="pi pi-check"
                    onClick={onAgree}
                    style={buttonStyle}
                    className="p-button-success"
                />
            </Panel>
        </div>
    );
}

export default TermsOfService;
