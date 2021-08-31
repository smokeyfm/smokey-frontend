/* eslint-disable no-console */
import React from 'react';
import PropTypes from 'prop-types';

// import { Close } from '@carvana/icons';

export const ElectronicSignaturesModal = () => {
  const advocatePhoneNumber = '1.800.333.4554';
  return (
    <div className="es-modal-container">
      <div className="es-modal-content-container">
        <p className="es-modal-text">
          Please read this carefully and print a copy for your reference.
        </p>

        <p className="es-modal-content-title bold">Definitions:</p>
        <p className="es-modal-text">
          “We,” “us,” “our” and “Carvana” means Carvana LLC, its successors,
          assigns, parents, subsidiaries, affiliates, service providers and
          other contractual partners.
        </p>
        <p className="es-modal-text">
          “You” and “your” means the person giving this consent.
        </p>
        <p className="es-modal-text">
          “Records” means all documents related to the sale and financing of a
          used motor vehicle from Carvana, such as your credit application, your
          retail installment contract, consumer disclosures, billing statements,
          online bill payments and payment authorizations, transaction
          histories, privacy policies, and all other communication or
          information related to the product or service you obtain from us,
          including any records we are required by law to provide to you in
          writing.
        </p>

        <p className="es-modal-content-title bold">Scope of consent:</p>
        <p className="es-modal-text">
          By giving your consent, you agree to conduct transactions with Carvana
          electronically, including using electronic signatures. You agree that
          such electronic signatures will consist of clicking on buttons and/or
          checking boxes where indicated. You also consent to the use of
          electronic Records, including Records sent to you electronically,
          instead of receiving them on paper or by regular mail. We may provide
          Records to you electronically by posting them online or by email,
          which may include the Records as attachments or as embedded links.
          Your consent will be effective unless you withdraw it in the manner
          provided below. Your consent will apply to any transaction or
          agreement that you may enter into with us in the future that modifies
          or extends your original transaction.
        </p>

        <p className="es-modal-content-title bold">
          How to update your contact information:
        </p>
        <p className="es-modal-text">
          You agree to provide us with your accurate email address and personal
          contact information and to promptly notify us of any changes. If you
          have a working email address, your personal contact information must
          include that email address. You can update your information (including
          your email address) on our website or by contacting us at{' '}
          {advocatePhoneNumber}. If email is undeliverable to your email address
          for three consecutive months, your consent will be considered
          withdrawn and we will send you future Records in writing.
        </p>

        <p className="es-modal-content-title bold">Obtaining paper copies:</p>
        <p className="es-modal-text">
          You may obtain a paper copy of a Record by printing it from your
          electronic device or by contacting us at {advocatePhoneNumber}. We may
          charge you a reasonable service charge for providing you with a paper
          copy of any Record. The request for a paper copy of a Record will not
          by itself constitute a withdrawal of your consent to receive Records
          electronically. We reserve the right, but are not required, to send a
          paper copy of any Record you authorize us to provide electronically.
        </p>

        <p className="es-modal-content-title bold">Withdrawing consent:</p>
        <p className="es-modal-text">
          If you do not consent to the use of electronic signatures and Records,
          you will not be able to complete your purchase of a motor vehicle. In
          addition, if you give your consent, but withdraw it before completing
          your purchase, you will not be able to complete your purchase. After
          you have completed your purchase, you may at any time withdraw your
          consent to receive Records electronically, and instead elect at any
          time to use the U.S. Postal Service to obtain Records, by updating
          your profile information through your online account or by contacting
          us at {advocatePhoneNumber}.
        </p>
        <p className="es-modal-text">
          We will not impose any fee if you withdraw your consent to receive
          Records electronically but our communications with you may be slower.
          If you withdraw your consent to receive Records electronically, such
          withdrawal will not apply to Records that were furnished to you
          electronically before the date on which the withdrawal of your consent
          takes effect.
        </p>

        <p className="es-modal-content-title bold">
          Hardware and software requirements:
        </p>

        <p className="es-modal-text">
          In order to use Electronic signatures and Records and retain the
          electronic Communications, you will need the following:
        </p>

        <ul className="es-modal-text">
          <li>
            A computer or mobile device with Internet or mobile connectivity.
          </li>
          <li>
            For website-based Communications, a current web browser that
            supports 128-bit encryption. Minimum recommended browser standards
            are Microsoft Internet Explorer version 11.0 and above (see{' '}
            <a
              href="http://www.microsoft.com/ie"
              target="_blank"
              rel="noopener noreferrer"
            >
              http://www.microsoft.com/ie
            </a>
            ), the current version of Microsoft Edge (see
            <a
              href="https://www.microsoft.com/en-us/windows/microsoft-edge"
              target="_blank"
              rel="noopener noreferrer"
            >
              https://www.microsoft.com/en-us/windows/microsoft-edge
            </a>
            ), the current version of Mozilla Firefox (see{' '}
            <a
              href="http://www.mozilla.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              http://www.mozilla.com
            </a>
            ), the current version of Apple Safari (see{' '}
            <a
              href="http://www.apple.com/safari"
              target="_blank"
              rel="noopener noreferrer"
            >
              http://www.apple.com/safari
            </a>
            ), or the current version of Google Chrome (see{' '}
            <a
              href="http://www.google.com/chrome"
              target="_blank"
              rel="noopener noreferrer"
            >
              http://www.google.com/chrome
            </a>
            ). The browser must have cookies enabled.
          </li>
          <li>
            Access to the email address used to create an account for
            Carvana.com.
          </li>
          <li>
            Sufficient electronic storage capacity on your computer&quot;s hard
            drive or other data storage unit, to store copies of your records.
          </li>
          <li>
            A printer that is capable of printing from your Internet browser and
            email software, if you desire paper copies of your records.
          </li>
          <li>
            An application that can view, save and print PDF files (such as
            Adobe Reader). You can download a copy of Adobe Reader here:{' '}
            <a
              href="https://get.adobe.com/reader"
              target="_blank"
              rel="noopener noreferrer"
            >
              https://get.adobe.com/reader
            </a>
            .
          </li>
        </ul>

        <p className="es-modal-text">
          Should the hardware or software requirements for using Electronic
          Signatures and Records change, the revised requirements will be
          displayed during your next logged-in session on our website and we may
          require that you give new consent for electronic signatures,
          communications and transactions based on the revised requirements. By
          providing us your current email address and accessing this Agreement
          on this website, you are confirming that you have the required
          hardware and software to conduct electronic transactions with Carvana.
        </p>

        <p className="es-modal-text bold">Rev June 2018</p>
      </div>
    </div>
  );
};

// ElectronicSignaturesModal.propTypes = {
//   handleClose: PropTypes.func.isRequired,
// };