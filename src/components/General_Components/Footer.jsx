import "./General.css";
export default function Footer() {
  return (
    <>
      <footer className="footer">
        <div className="get_In_Touch">
          having any trouble? feel free to get in touch in any of the following
          ways, and we will help in no time!
        </div>
        <div>
          <a className="footer_Link" href="tel:+972-52-851-2078">
            Phone
          </a>
          <a className="footer_Link" href="mailto:dorbruker1@gmail.com">
            Email
          </a>
          <a className="footer_Link" href="https://wa.me/972528512078">
            WhatsaApp
          </a>
          <a className="footer_Link" href="https://github.com/dorb99">
            GitHub
          </a>
        </div>
        <div className="rights_div">
          all rights reserved to 'Money Saver' cooperation. The company is
          intitled to close at any minute and remove any user ho break the
          copyrights
        </div>
      </footer>
    </>
  );
}
