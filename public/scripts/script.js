function setStatus(s) { statusLine.textContent = s; }

async function loadJSON() {
    const fileList = ["./default_quiz.json", "./questions.json"];
    let loaded = false;

    for (const file of fileList) {
        try {
            setStatus(`Đang tải ${file}...`);
            const resp = await fetch(file, { cache: 'no-cache' });
            if (!resp.ok) throw new Error(`Không tìm thấy ${file} (HTTP ${resp.status})`);
            questions = await resp.json();
            setStatus(`Đã load file ${file}`);
            loaded = true;
            break;
        } catch (err) {
            console.warn(err);
        }
    }

    if (!loaded) {
        setStatus('Không tìm thấy default_quiz.json hoặc questions.json. Bạn có thể bấm "Dán JSON" để dán thủ công.');
        questions = [];
    }
    if (!questions.length) {
        questions = [
            {
                "id": 1,
                "question": "Trong bảng tính MS Excel, tại ô A2 có giá trị chuỗi \"a\", tại ô B2 gõ công thức =5/A2 cho kết quả:",
                "options": [
                    {
                        "key": "a",
                        "text": "#DIV/0!"
                    },
                    {
                        "key": "b",
                        "text": "5"
                    },
                    {
                        "key": "c",
                        "text": "#VALUE!"
                    },
                    {
                        "key": "d",
                        "text": "0"
                    }
                ],
                "answer": "c"
            },
            {
                "id": 2,
                "question": "Dưới góc độ địa lý, mạng máy tính được phân biệt thành:",
                "options": [
                    {
                        "key": "a",
                        "text": "Mạng diện rộng, mạng toàn cầu, mạng toàn cục"
                    },
                    {
                        "key": "b",
                        "text": "Mạng cục bộ, mạng toàn cục, mạng toàn cầu"
                    },
                    {
                        "key": "c",
                        "text": "Mạng cục bộ, mạng diện rộng, mạng toàn cầu"
                    },
                    {
                        "key": "d",
                        "text": "Mạng cục bộ, mạng diện rộng, mạng toàn cục"
                    }
                ],
                "answer": "c"
            },
            {
                "id": 3,
                "question": "Muốn tính trung bình của hàng hay cột, ta sử dụng hàm nào trong số các hàm dưới đây?",
                "options": [
                    {
                        "key": "a",
                        "text": "Hàm SUM()"
                    },
                    {
                        "key": "b",
                        "text": "Hàm AVERAGE()"
                    },
                    {
                        "key": "c",
                        "text": "Hàm COUNT()"
                    },
                    {
                        "key": "d",
                        "text": "Hàm MEDIAN()"
                    }
                ],
                "answer": "b"
            },
            {
                "id": 4,
                "question": "Công thức INT(123/2) cho kết quả là:",
                "options": [
                    {
                        "key": "a",
                        "text": "61"
                    },
                    {
                        "key": "b",
                        "text": "62"
                    },
                    {
                        "key": "c",
                        "text": "60"
                    },
                    {
                        "key": "d",
                        "text": "Công thức sai"
                    }
                ],
                "answer": "b"
            },
            {
                "id": 5,
                "question": "Phương pháp nào nhanh nhất cho phép bạn xem hai hoặc nhiều website trên trình duyệt của bạn?",
                "options": [
                    {
                        "key": "a",
                        "text": "Mở tab mới trên trình duyệt để truy cập website khác"
                    },
                    {
                        "key": "b",
                        "text": "Nhập địa chỉ mới của website vào thanh địa chỉ hiện tại"
                    },
                    {
                        "key": "c",
                        "text": "Thiết lập cửa sổ riêng biệt để mở thêm trang web khác"
                    },
                    {
                        "key": "d",
                        "text": "Sử dụng tính năng chia màn hình của hệ điều hành"
                    }
                ],
                "answer": "a"
            },
            {
                "id": 6,
                "question": "Trong bảng tính Excel, tại ô A2 có giá trị là chuỗi '25/', tại ô B2 gõ công thức =SQRT(A2) thì nhận được kết quả:",
                "options": [
                    {
                        "key": "a",
                        "text": "#VALUE!"
                    },
                    {
                        "key": "b",
                        "text": "5"
                    },
                    {
                        "key": "c",
                        "text": "25"
                    },
                    {
                        "key": "d",
                        "text": "#NAME?"
                    }
                ],
                "answer": "a"
            },
            {
                "id": 7,
                "question": "Công thức MOD(8*3/2,7) cho kết quả:",
                "options": [
                    {
                        "key": "a",
                        "text": "5"
                    },
                    {
                        "key": "b",
                        "text": "6"
                    },
                    {
                        "key": "c",
                        "text": "4"
                    },
                    {
                        "key": "d",
                        "text": "1"
                    }
                ],
                "answer": "a"
            },
            {
                "id": 8,
                "question": "Trong soạn thảo Word, muốn trình bày văn bản theo hướng ngang (landscape) ta chọn mục:",
                "options": [
                    {
                        "key": "a",
                        "text": "Page Layout → Orientation → Landscape"
                    },
                    {
                        "key": "b",
                        "text": "File → Page Setup → Portrait"
                    },
                    {
                        "key": "c",
                        "text": "View → Orientation → Landscape"
                    },
                    {
                        "key": "d",
                        "text": "Insert → Layout → Landscape"
                    }
                ],
                "answer": "a"
            },
            {
                "id": 9,
                "question": "Trên màn hình Desktop, ta có thể thực hiện:",
                "options": [
                    {
                        "key": "a",
                        "text": "Tạo hoặc xóa Shortcut"
                    },
                    {
                        "key": "b",
                        "text": "Tạo hoặc xóa tập tin"
                    },
                    {
                        "key": "c",
                        "text": "Tạo hoặc xóa thư mục"
                    },
                    {
                        "key": "d",
                        "text": "Cả ba phương án trên đều đúng"
                    }
                ],
                "answer": "d"
            },
            {
                "id": 10,
                "question": "Công thức INT(7*5/2) cho kết quả là:",
                "options": [
                    {
                        "key": "a",
                        "text": "17"
                    },
                    {
                        "key": "b",
                        "text": "17.5"
                    },
                    {
                        "key": "c",
                        "text": "18"
                    },
                    {
                        "key": "d",
                        "text": "Công thức sai"
                    }
                ],
                "answer": "a"
            },
            {
                "id": 11,
                "question": "Công thức INT(123.56,1) cho kết quả là:",
                "options": [
                    {
                        "key": "a",
                        "text": "123"
                    },
                    {
                        "key": "b",
                        "text": "123.5"
                    },
                    {
                        "key": "c",
                        "text": "124"
                    },
                    {
                        "key": "d",
                        "text": "Công thức sai"
                    }
                ],
                "answer": "a"
            },
            {
                "id": 12,
                "question": "Trong PowerPoint, để chèn một bảng vào trong slide, bạn có thể:",
                "options": [
                    {
                        "key": "a",
                        "text": "Chọn Insert → Table → Insert Table"
                    },
                    {
                        "key": "b",
                        "text": "Chọn Layout → Table → Insert Table"
                    },
                    {
                        "key": "c",
                        "text": "Chọn Home → New Slide"
                    },
                    {
                        "key": "d",
                        "text": "Không có đáp án phù hợp"
                    }
                ],
                "answer": "a"
            },
            {
                "id": 13,
                "question": "Người và máy tính giao tiếp thông qua:",
                "options": [
                    {
                        "key": "a",
                        "text": "Bàn phím và màn hình"
                    },
                    {
                        "key": "b",
                        "text": "Cả ba đều đúng"
                    },
                    {
                        "key": "c",
                        "text": "RAM"
                    },
                    {
                        "key": "d",
                        "text": "Hệ điều hành"
                    }
                ],
                "answer": "b"
            },
            {
                "id": 14,
                "question": "Trong MS Word 2013, để chèn hình vào văn bản, ta thực hiện:",
                "options": [
                    {
                        "key": "a",
                        "text": "Thẻ Insert → Picture"
                    },
                    {
                        "key": "b",
                        "text": "Thẻ Review → Picture"
                    },
                    {
                        "key": "c",
                        "text": "Thẻ Data → Picture"
                    },
                    {
                        "key": "d",
                        "text": "Không có đáp án phù hợp"
                    }
                ],
                "answer": "a"
            },
            {
                "id": 15,
                "question": "Trong MS Word, để mở một tệp có dạng *.docx hoặc *.xlsx, ta thực hiện:",
                "options": [
                    {
                        "key": "a",
                        "text": "File → Open"
                    },
                    {
                        "key": "b",
                        "text": "File → Save"
                    },
                    {
                        "key": "c",
                        "text": "Insert → Object"
                    },
                    {
                        "key": "d",
                        "text": "Không có đáp án phù hợp"
                    }
                ],
                "answer": "a"
            },
            {
                "id": 16,
                "question": "An đã truy cập đến một website vào thứ Ba tuần trước, trong đó có công thức làm bánh mì thịt mà An đang muốn thử lại nhưng không nhớ địa chỉ trang. An nên làm gì?",
                "options": [
                    {
                        "key": "a",
                        "text": "Mở lại lịch sử trình duyệt (History) để tìm website"
                    },
                    {
                        "key": "b",
                        "text": "Nhấn nút Refresh để tải lại trang"
                    },
                    {
                        "key": "c",
                        "text": "Thực hiện tìm kiếm lại công thức trên công cụ tìm kiếm"
                    },
                    {
                        "key": "d",
                        "text": "Không có đáp án phù hợp"
                    }
                ],
                "answer": "a"
            },
            {
                "id": 17,
                "question": "Phần mở rộng nào sau đây là phần mở rộng của tập tin hình ảnh?",
                "options": [
                    {
                        "key": "a",
                        "text": ".BMP"
                    },
                    {
                        "key": "b",
                        "text": ".DOCX"
                    },
                    {
                        "key": "c",
                        "text": ".EXE"
                    },
                    {
                        "key": "d",
                        "text": ".XLSX"
                    }
                ],
                "answer": "a"
            },
            {
                "id": 18,
                "question": "Trong MS Word, tổ hợp phím Ctrl + V dùng để:",
                "options": [
                    {
                        "key": "a",
                        "text": "Dán nội dung trong Clipboard vào vị trí con trỏ"
                    },
                    {
                        "key": "b",
                        "text": "Sao chép nội dung đã chọn vào Clipboard"
                    },
                    {
                        "key": "c",
                        "text": "Cắt nội dung đã chọn và lưu vào Clipboard"
                    },
                    {
                        "key": "d",
                        "text": "Không có đáp án phù hợp"
                    }
                ],
                "answer": "a"
            },
            {
                "id": 19,
                "question": "Để tạo một slide giống hệt như slide hiện hành mà không phải thiết kế lại, người dùng thực hiện:",
                "options": [
                    {
                        "key": "a",
                        "text": "Insert → Duplicate Slide"
                    },
                    {
                        "key": "b",
                        "text": "Insert → New Slide"
                    },
                    {
                        "key": "c",
                        "text": "Home → Layout"
                    },
                    {
                        "key": "d",
                        "text": "Không có đáp án phù hợp"
                    }
                ],
                "answer": "a"
            },
            {
                "id": 20,
                "question": "Trong PowerPoint, để thiết kế trình chiếu, ta dùng:",
                "options": [
                    {
                        "key": "a",
                        "text": "Vào tab Slide Show → chọn Set Up Slide Show"
                    },
                    {
                        "key": "b",
                        "text": "Vào tab View → chọn Slide Master"
                    },
                    {
                        "key": "c",
                        "text": "Vào tab Animations → thiết lập hiệu ứng"
                    },
                    {
                        "key": "d",
                        "text": "Không có đáp án phù hợp"
                    }
                ],
                "answer": "a"
            },
            {
                "id": 21,
                "question": "Trong Word, để di chuyển về đầu tài liệu, nhấn:",
                "options": [
                    {
                        "key": "a",
                        "text": "End"
                    },
                    {
                        "key": "b",
                        "text": "Ctrl + Home"
                    },
                    {
                        "key": "c",
                        "text": "Ctrl + Page Down"
                    },
                    {
                        "key": "d",
                        "text": "Page Down"
                    }
                ],
                "answer": "b"
            },
            {
                "id": 22,
                "question": "Cho biết kết quả của công thức sau đây: =AND(OR(12>=10,73>=50,48>=6),(32<3))",
                "options": [
                    {
                        "key": "a",
                        "text": "Công thức sai"
                    },
                    {
                        "key": "b",
                        "text": "TRUE"
                    },
                    {
                        "key": "c",
                        "text": "FALSE"
                    },
                    {
                        "key": "d",
                        "text": "Không có đáp án phù hợp"
                    }
                ],
                "answer": "c"
            },
            {
                "id": 23,
                "question": "Trong Windows, để thay đổi thiết lập hệ thống, ta chọn chức năng:",
                "options": [
                    {
                        "key": "a",
                        "text": "Control Panel"
                    },
                    {
                        "key": "b",
                        "text": "Control Desktop"
                    },
                    {
                        "key": "c",
                        "text": "Control Windows"
                    },
                    {
                        "key": "d",
                        "text": "System Settings"
                    }
                ],
                "answer": "a"
            },
            {
                "id": 24,
                "question": "Trong PowerPoint, hãy liệt kê các phương pháp có thể sử dụng để chèn biểu đồ vào trong slide:",
                "options": [
                    {
                        "key": "a",
                        "text": "Thay đổi bố cục slide thành Title and Content, chọn biểu tượng Insert Chart"
                    },
                    {
                        "key": "b",
                        "text": "Trên thẻ Insert, trong nhóm Illustrations, chọn Chart → Insert Chart"
                    },
                    {
                        "key": "c",
                        "text": "Chèn biểu đồ bằng cách sao chép từ Excel sang PowerPoint"
                    },
                    {
                        "key": "d",
                        "text": "Cả ba phương án trên đều đúng"
                    }
                ],
                "answer": "d"
            },
            {
                "id": 25,
                "question": "Anh (chị) hiểu virus tin học là gì?",
                "options": [
                    {
                        "key": "a",
                        "text": "Là chương trình có khả năng phá hoại các sản phẩm tin học"
                    },
                    {
                        "key": "b",
                        "text": "Có khả năng tự sao chép để lây lan"
                    },
                    {
                        "key": "c",
                        "text": "Là chương trình máy tính do con người tạo ra"
                    },
                    {
                        "key": "d",
                        "text": "Tất cả các đáp án trên đều đúng"
                    }
                ],
                "answer": "d"
            },
            {
                "id": 26,
                "question": "Trong MS Word, muốn tạo số thứ tự tự động ở đầu mỗi đoạn văn bản, ta chọn chức năng:",
                "options": [
                    {
                        "key": "a",
                        "text": "Symbol"
                    },
                    {
                        "key": "b",
                        "text": "Bullets"
                    },
                    {
                        "key": "c",
                        "text": "Numbering and Bullets"
                    },
                    {
                        "key": "d",
                        "text": "Numbering"
                    }
                ],
                "answer": "d"
            },
            {
                "id": 27,
                "question": "Trong MS Word 2013, để tìm và thay thế những định dạng đặc biệt, ta thực hiện:",
                "options": [
                    {
                        "key": "a",
                        "text": "Thẻ Page Layout → Edit → Find/Replace → More → Format"
                    },
                    {
                        "key": "b",
                        "text": "Thẻ Home → Editing → Replace → More → Format"
                    },
                    {
                        "key": "c",
                        "text": "Thẻ Insert → Editing → Replace"
                    },
                    {
                        "key": "d",
                        "text": "Không có đáp án phù hợp"
                    }
                ],
                "answer": "b"
            },
            {
                "id": 28,
                "question": "Khi đang làm việc với Word hoặc Excel, nếu lưu tệp tin vào đĩa, thì tệp đó:",
                "options": [
                    {
                        "key": "a",
                        "text": "Có thể lưu vào bất kỳ thư mục nào người dùng chọn"
                    },
                    {
                        "key": "b",
                        "text": "Luôn nằm trong thư mục My Documents (mặc định)"
                    },
                    {
                        "key": "c",
                        "text": "Bắt buộc ở trong thư mục cài đặt phần mềm"
                    },
                    {
                        "key": "d",
                        "text": "Không có đáp án phù hợp"
                    }
                ],
                "answer": "a"
            },
            {
                "id": 29,
                "question": "Công thức MOD(6*3/2,5) cho kết quả:",
                "options": [
                    {
                        "key": "a",
                        "text": "4"
                    },
                    {
                        "key": "b",
                        "text": "5"
                    },
                    {
                        "key": "c",
                        "text": "1"
                    },
                    {
                        "key": "d",
                        "text": "Không có đáp án phù hợp"
                    }
                ],
                "answer": "c"
            },
            {
                "id": 30,
                "question": "Cái gì dưới đây là sự kết hợp giữa phần cứng và phần mềm, cho phép các máy tính sử dụng chung tài nguyên trong một tổ chức?",
                "options": [
                    {
                        "key": "a",
                        "text": "Mạng máy tính"
                    },
                    {
                        "key": "b",
                        "text": "Hệ điều hành"
                    },
                    {
                        "key": "c",
                        "text": "Cơ sở dữ liệu quan hệ"
                    },
                    {
                        "key": "d",
                        "text": "Không có đáp án phù hợp"
                    }
                ],
                "answer": "a"
            },
            {
                "id": 31,
                "question": "Trong MS Word, bôi đen một cụm từ trong văn bản rồi lần lượt thực hiện thao tác: nhấn tổ hợp phím Ctrl + B tiếp đến Ctrl + I, cụm từ được bôi đen sẽ:",
                "options": [
                    {
                        "key": "a",
                        "text": "Được in đậm và in nghiêng"
                    },
                    {
                        "key": "b",
                        "text": "Được in đậm"
                    },
                    {
                        "key": "c",
                        "text": "Được gạch dưới"
                    },
                    {
                        "key": "d",
                        "text": "Không có thay đổi nào"
                    }
                ],
                "answer": "a"
            },
            {
                "id": 32,
                "question": "Trong MS PowerPoint, muốn chèn thêm một slide mới ta nhấn tổ hợp phím:",
                "options": [
                    {
                        "key": "a",
                        "text": "Ctrl + M"
                    },
                    {
                        "key": "b",
                        "text": "Ctrl + N"
                    },
                    {
                        "key": "c",
                        "text": "Ctrl + D"
                    },
                    {
                        "key": "d",
                        "text": "Ctrl + O"
                    }
                ],
                "answer": "a"
            },
            {
                "id": 33,
                "question": "Trong MS Word, phím hoặc tổ hợp phím nào cho phép di chuyển con trỏ về đầu tài liệu:",
                "options": [
                    {
                        "key": "a",
                        "text": "Ctrl + Page Up"
                    },
                    {
                        "key": "b",
                        "text": "Home"
                    },
                    {
                        "key": "c",
                        "text": "Ctrl + Home"
                    },
                    {
                        "key": "d",
                        "text": "Ctrl + End"
                    }
                ],
                "answer": "c"
            },
            {
                "id": 34,
                "question": "Trong Excel, hàm MIN(-52, 20, 15) cho kết quả:",
                "options": [
                    {
                        "key": "a",
                        "text": "-52"
                    },
                    {
                        "key": "b",
                        "text": "15"
                    },
                    {
                        "key": "c",
                        "text": "20"
                    },
                    {
                        "key": "d",
                        "text": "0"
                    }
                ],
                "answer": "a"
            },
            {
                "id": 35,
                "question": "Phím Page Up trong Windows hoặc các trình soạn thảo có tác dụng gì?",
                "options": [
                    {
                        "key": "a",
                        "text": "Di chuyển con trỏ lên trên một trang"
                    },
                    {
                        "key": "b",
                        "text": "Di chuyển con trỏ xuống dưới một trang"
                    },
                    {
                        "key": "c",
                        "text": "Xóa trang hiện tại"
                    },
                    {
                        "key": "d",
                        "text": "Không có đáp án phù hợp"
                    }
                ],
                "answer": "a"
            },
            {
                "id": 36,
                "question": "Trong MS Word 2013, để định dạng văn bản theo kiểu danh sách, ta thực hiện:",
                "options": [
                    {
                        "key": "a",
                        "text": "Format → Bullets and Numbering"
                    },
                    {
                        "key": "b",
                        "text": "Tools → Bullets and Numbering"
                    },
                    {
                        "key": "c",
                        "text": "Home → Paragraph → Bullets/Numbering"
                    },
                    {
                        "key": "d",
                        "text": "Insert → Numbering"
                    }
                ],
                "answer": "c"
            },
            {
                "id": 37,
                "question": "Trong Excel, để chọn vùng dữ liệu từ ô B1 đến ô D10, ta nhập vào thanh công thức:",
                "options": [
                    {
                        "key": "a",
                        "text": "B1:D10"
                    },
                    {
                        "key": "b",
                        "text": "B$1:D$10"
                    },
                    {
                        "key": "c",
                        "text": "=$B$1:$D$10"
                    },
                    {
                        "key": "d",
                        "text": "Không có đáp án phù hợp"
                    }
                ],
                "answer": "a"
            },
            {
                "id": 38,
                "question": "Phần mềm gián điệp (Spyware) là gì?",
                "options": [
                    {
                        "key": "a",
                        "text": "Phần mềm tự động theo dõi và thu thập thông tin người dùng mà không có sự cho phép"
                    },
                    {
                        "key": "b",
                        "text": "Phần mềm sao chép chính nó để lây lan"
                    },
                    {
                        "key": "c",
                        "text": "Phần mềm quản lý hệ thống mạng"
                    },
                    {
                        "key": "d",
                        "text": "Không có đáp án phù hợp"
                    }
                ],
                "answer": "a"
            },
            {
                "id": 39,
                "question": "Thiết bị lưu trữ nào thường được dùng để sao lưu dữ liệu?",
                "options": [
                    {
                        "key": "a",
                        "text": "Ổ đĩa cứng (Hard Disk)"
                    },
                    {
                        "key": "b",
                        "text": "Đĩa CD/DVD"
                    },
                    {
                        "key": "c",
                        "text": "USB hoặc ổ lưu trữ di động"
                    },
                    {
                        "key": "d",
                        "text": "Cả ba phương án trên đều đúng"
                    }
                ],
                "answer": "d"
            },
            {
                "id": 40,
                "question": "Trong Windows, từ 'Shortcut' có ý nghĩa là gì?",
                "options": [
                    {
                        "key": "a",
                        "text": "Đường dẫn nhanh đến một tệp hoặc thư mục"
                    },
                    {
                        "key": "b",
                        "text": "Đường dẫn tạm thời"
                    },
                    {
                        "key": "c",
                        "text": "Liên kết ảo không thể mở"
                    },
                    {
                        "key": "d",
                        "text": "Không có đáp án phù hợp"
                    }
                ],
                "answer": "a"
            }
        ]
    }

    initData();
}

function initData() {
    questions = (questions || []).map(q => {
        const opts = Array.isArray(q.options) ? q.options : (q.choices || []);
        return {
            id: q.id ?? q.question?.slice(0, 6) ?? Math.random(),
            question: (q.question || q.text || q.q || '').toString().trim(),
            options: opts.map(o => ({ key: (o.key || '').toString().trim(), text: (o.text || o).toString().trim() })),
            answer: q.answer ?? null,
            raw: q
        };
    });
    filtered = [...questions];
    document.getElementById('totalCount').textContent = questions.length;
    renderPage();
    renderPager();
    setStatus(`Sẵn sàng — ${questions.length} câu hỏi`);
}

function renderPage() {
    const container = document.getElementById('questionsContainer');
    container.innerHTML = '';
    const start = (currentPage - 1) * perPage;
    const pageItems = filtered.slice(start, start + perPage);
    document.getElementById('currentIndex').textContent = (pageItems.length ? start + 1 : 0);

    pageItems.forEach((q, idx) => {
        const card = document.createElement('div'); card.className = 'card';
        const qnum = start + idx + 1;
        const header = document.createElement('div'); header.className = 'qheader';
        header.id = "qheader-" + qnum
        header.innerHTML = `<div class="qid">${qnum}</div><div style="flex:1"><div class="qtext">${escapeHtml(q.question)}</div></div>`;
        card.appendChild(header);

        const opts = document.createElement('div'); opts.className = 'options';
        opts.id = `qopts-${q.id}`
        if (!q.options || q.options.length === 0) {
            // fallback: try to detect options from raw
            opts.innerHTML = '<div class="small" style="color:var(--muted)">Không có lựa chọn (dữ liệu thô)</div>';
        } else {
            q.options.forEach(o => {
                const opt = document.createElement('div');
                opt.className = 'opt';
                opt.id = `qopt-${q.id}_${o.key}`
                opt.setAttribute('data-key', o.key);
                opt.innerHTML = `<div class="label">${escapeHtml(o.key)}</div><div style="flex:1">${escapeHtml(o.text)}</div>`;
                // click handler (if quiz mode, mark selected)
                opt.addEventListener('click', () => {
                    if (quizMode) {
                        // mark selected and show correct/wrong
                        // const siblings = opt.parentNode.querySelectorAll('.opt');
                        // siblings.forEach(s => s.classList.remove('selected', 'wrong', 'correct'));
                        // opt.classList.add('selected');
                        // if (showAnswers && q.answer && o.key === q.answer) {
                        //     opt.classList.add('correct');
                        // } else {
                        //     opt.classList.add('wrong');
                        //     // highlight correct
                        //     const corr = opt.parentNode.querySelector('.opt[data-key="' + q.answer + '"]');
                        //     if (corr) corr.classList.add('correct');
                        // }

                        setQuizUserAnswer(q.id, o.key)
                    }
                });
                opts.appendChild(opt);
            });
        }
        card.appendChild(opts);

        const meta = document.createElement('div'); meta.className = 'meta';
        meta.innerHTML = `<div class="small">ID: ${escapeHtml(String(q.id))}</div>
                      <div class="small">Opts: ${q.options?.length ?? 0}</div>
                      <div class="small">${q.answer ? 'Has answer' : 'No answer'}</div>`;
        card.appendChild(meta);

        if (!showAnswers) {
            const elements = document.getElementsByClassName('opt')
            for (let i = 0; i < elements.length; i++) {
                elements[i].classList.remove('disabled', 'correct', 'wrong', 'selected');   
            }
        }
        if (showAnswers && q.answer) {
            // show answer note
            const note = document.createElement('div');
            note.style.marginTop = '8px';
            note.style.fontSize = '13px';
            note.style.color = 'var(--muted)';
            note.innerHTML = `<strong>Đáp án:</strong> ${escapeHtml(String(q.answer))}`;
            card.appendChild(note);
            // mark correct option visually
            const corr = opts.querySelector('.opt[data-key="' + q.answer + '"]');
            if (corr) corr.classList.add('correct');
            const quizInfo = getQuizInfoById(q.id)
            if (quizMode && !!submited && !!quizInfo.userAnswer) {
                const userOpt = opts.querySelector('.opt[data-key="' + quizInfo.userAnswer + '"]');
                console.log(userOpt);
                
                if (userOpt && userOpt !== corr) userOpt.classList.add('wrong');
            }
            const elements = document.getElementsByClassName('opt')
            for (let i = 0; i < elements.length; i++) {
                elements[i].classList.add('disabled');
            }
        }

        container.appendChild(card);
    });

    // if none
    if (pageItems.length === 0) {
        container.innerHTML = '<div style="padding:18px; color:var(--muted)">Không có câu hỏi để hiển thị.</div>';
    }
}

function renderPager() {
    const pageNumbers = document.getElementById('pageNumbers');
    pageNumbers.innerHTML = '';
    const pageCount = Math.max(1, Math.ceil(filtered.length / perPage));
    // show window of pages
    const maxButtons = 7;
    let start = Math.max(1, currentPage - Math.floor(maxButtons / 2));
    let end = Math.min(pageCount, start + maxButtons - 1);
    if (end - start < maxButtons - 1) start = Math.max(1, end - maxButtons + 1);

    for (let i = start; i <= end; i++) {
        const b = document.createElement('button');
        b.className = 'page-btn' + (i === currentPage ? ' active' : '');
        b.textContent = i;
        b.addEventListener('click', () => { currentPage = i; renderPage(); renderPager(); });
        pageNumbers.appendChild(b);
    }
}

function escapeHtml(s) {
    if (!s) return '';
    return s.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;');
}

// controls
document.getElementById('prevPage').addEventListener('click', () => {
    if (currentPage > 1) currentPage--; renderPage(); renderPager();
});
document.getElementById('nextPage').addEventListener('click', () => {
    const pageCount = Math.max(1, Math.ceil(filtered.length / perPage));
    if (currentPage < pageCount) currentPage++; renderPage(); renderPager();
});
document.querySelectorAll('.page-btn[data-per]').forEach(b => {
    b.addEventListener('click', () => {
        document.querySelectorAll('.page-btn[data-per]').forEach(x => x.classList.remove('active'));
        b.classList.add('active');
        perPage = Number(b.dataset.per);
        currentPage = 1;
        renderPage(); renderPager();
    });
});

document.getElementById('gotoBtn').addEventListener('click', () => {
    const v = Number(document.getElementById('gotoInput').value);
    scrollToQuestion(v)
});

document.getElementById('search').addEventListener('input', (e) => {
    const q = e.target.value.trim().toLowerCase();
    if (!q) {
        filtered = [...questions];
    } else {
        filtered = questions.filter(it => {
            return (it.question || '').toLowerCase().includes(q)
                || (it.options || []).some(o => (o.text || '').toLowerCase().includes(q) || (o.key || '').toLowerCase().includes(q))
                || String(it.id || '').includes(q);
        });
    }
    currentPage = 1;
    renderPage(); renderPager();
});

document.getElementById('clearSearch').addEventListener('click', () => {
    document.getElementById('search').value = ''; document.getElementById('search').dispatchEvent(new Event('input'));
});

document.getElementById('shuffleBtn').addEventListener('click', () => {
    questions = shuffleArray(questions);
    filtered = [...questions];
    currentPage = 1;
    renderPage(); renderPager();
    setStatus('Đã xáo câu hỏi');
});

document.getElementById('showAnswersBtn').addEventListener('click', () => {
    toggleShowAnswers()
});

document.getElementById('exportBtn').addEventListener('click', () => {
    const start = (currentPage - 1) * perPage;
    const slice = filtered.slice(start, start + perPage);
    const blob = new Blob([JSON.stringify(slice, null, 2)], { type: 'application/json;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a'); a.href = url; a.download = `questions-page-${currentPage}.json`; a.click();
    URL.revokeObjectURL(url);
});


function shuffleArray(a) {
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
}

/* JSON paste modal */
const modal = document.getElementById('jsonModal');
document.getElementById('loadJsonBtn').addEventListener('click', () => { modal.style.display = 'flex'; });
document.getElementById('cancelJson').addEventListener('click', () => { modal.style.display = 'none'; });
document.getElementById('loadPastedJson').addEventListener('click', () => {
    const txt = document.getElementById('jsonPaste').value.trim();
    if (!txt) return alert('Chưa dán JSON');
    try {
        const arr = JSON.parse(txt);
        if (!Array.isArray(arr)) throw new Error('JSON phải là mảng các câu hỏi');
        questions = arr;
        modal.style.display = 'none';
        document.getElementById('jsonPaste').value = '';
        initData();
    } catch (err) {
        alert('JSON không hợp lệ: ' + err.message);
    }
});

/* keyboard navigation */
document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight') { document.getElementById('nextPage').click(); }
    if (e.key === 'ArrowLeft') { document.getElementById('prevPage').click(); }
});

/* initial load */
loadJSON();

/* helpers */
function download(filename, text) {
    const pom = document.createElement('a');
    pom.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
    pom.setAttribute('download', filename);
    pom.style.display = 'none';
    document.body.appendChild(pom);
    pom.click();
    document.body.removeChild(pom);
}