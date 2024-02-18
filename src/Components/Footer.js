import { Link } from "react-router-dom";

import  "./Styles/Footer.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook, faTwitter, faYoutube } from '@fortawesome/free-brands-svg-icons'

export default function Footer () {
    return (
        <footer>
            <div className="container d-flex flex-column flex-sm-row pb-3" style={{borderBottom: "1px solid var(--grey)"}}>
                <div className="flex-grow-1 ft-col">
                    <h3>Hỗ trợ khách hàng</h3>
                    <ul>
                        <li><Link to="/">Hotline: <b>1900-6035</b><br/>(1000 đ/phút, 8-21h kể cả T7, CN)</Link></li>
                        <li><Link to="/">Các câu hỏi thường gặp</Link></li>
                        <li><Link to="/">Gửi yêu cầu hỗ trợ</Link></li>
                        <li><Link to="/">Hướng dẫn đặt hàng</Link></li>
                        <li><Link to="/">Phương thức vận chuyển</Link></li>
                        <li><Link to="/">Chính sách đổi trả</Link></li>
                        <li><Link to="/">Hướng dẫn trả góp</Link></li>
                        <li><Link to="/">Chính sách hàng nhập khẩu</Link></li>
                        <li><Link to="/">Hỗ trợ khách hàng: hotro@tiki.vn</Link></li>
                        <li><Link to="/">Báo lỗi bảo mật: security@tiki.vn</Link></li>
                    </ul>
                </div> 
                <div className="flex-grow-1 ft-col">
                    <h3>Về Tiki</h3>
                    <ul>
                        <li><Link to="/">Giới thiệu Tiki</Link></li>
                        <li><Link to="/">Tiki Blog</Link></li>
                        <li><Link to="/">Tuyển dụng</Link></li>
                        <li><Link to="/">Chính sách bảo mật thanh toán</Link></li>
                        <li><Link to="/">Chính sách bảo mật thông tin cá nhân</Link></li>
                        <li><Link to="/">Chính sách giải quyết khiếu nại</Link></li>
                        <li><Link to="/">Điều khoản sử dụng</Link></li>
                        <li><Link to="/">Giới thiệu Tiki Xu</Link></li>
                        <li><Link to="/">Gói hội viên VIP</Link></li>
                        <li><Link to="/">Tiếp thị liên kết cùng Tiki</Link></li>
                        <li><Link to="/">Bán hàng doanh nghiệp</Link></li>
                        <li><Link to="/">Điều kiện vận chuyển</Link></li>
                    </ul>
                </div>

                <div className="flex-grow-1 ft-col">
                    <h3>Hợp tác và liên kết</h3>
                    <ul>
                        <li><Link to="/">Quy chế hoạt động Sàn GDTMĐT</Link></li>
                        <li><Link to="/">Bán hàng cùng Tiki</Link></li>
                        <li>Chứng nhận bởi</li>
                        <li className="align-center"> <img src={require("../Assets/Images/certificate-logo.png")} /> </li>
                    </ul>
                </div>

                <div className="flex-grow-1 ft-col">
                    <h3>Phương thức thanh toán</h3>
                    <h3>Dịch vụ giao hàng</h3>
                </div>
                
                <div className="flex-grow-1 ft-col">
                    <h3>Kết nối với chúng tôi</h3>
                    <ul className="d-flex">
                        <li><Icon icon={faFacebook} style = {{color: "#3B5998"}} /></li>
                        <li><Icon icon={faYoutube} style = {{color: "#FF0000"}} /></li>
                        <li><Icon icon={faTwitter} style = {{color: "#3171F6"}} /></li>
                    </ul>
                    <h3>Tải ứng dụng trên điện thoại</h3>
                </div>
                
            </div>
            
            <div className="container py-4" style={{borderBottom: "1px solid var(--grey)"}}>
                <ul>
                    <li>Địa chỉ trụ sở: Tòa nhà Viettel, Số 285, Đường Cách Mạng Tháng 8, Phường 12, Quận 10, Thành phố Hồ Chí Minh</li>
                    <li>Giấy chứng nhận đăng ký doanh nghiệp số 0309532909 do Sở Kế Hoạch và Đầu Tư Thành phố Hồ Chí Minh cấp lần đầu vào ngày 06/01/2010.</li>
                    <li>Hotline: 1900 6035</li>
                </ul>
            </div>

        </footer>
    )
}


function Icon(props){
    return <FontAwesomeIcon style={{...props.style, fontSize: "25px", marginRight: "10px"}} icon={props.icon} />
}