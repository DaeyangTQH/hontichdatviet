# Product

## Register

brand

## Users

Người mua quà lưu niệm — du khách và người Việt tìm món quà có ý nghĩa, mua tại điểm tham quan hoặc online. Họ đang ở trạng thái khám phá: muốn hiểu sản phẩm là gì, chất liệu ra sao, và vì sao đáng sưu tập trước khi quyết định mua.

## Product Purpose

Hồn Tích Đất Việt làm **mô hình địa danh Việt Nam in 3D** — quà lưu niệm thủ công để trưng bày và sưu tập theo bộ.

**Định vị cốt lõi:** không phải đồ chơi đại trà, mà là **bộ sưu tập di sản Việt Nam dạng vật lý** — mỗi mô hình một địa danh, in 3D, hoàn thiện thủ công.

Site hiện tại là **landing giới thiệu sản phẩm**: showcase concept, kể chuyện thương hiệu, trình bày bộ sưu tập và thủ công.

Thành công trông như: người xem hiểu sản phẩm trong 30 giây (hero trả lời _cái gì / khác gì / làm gì tiếp_); cảm nhận văn hóa Việt qua thiết kế; tin tưởng chất lượng thủ công; muốn **sưu tập** chứ không chỉ mua một món; và có đường dẫn rõ tới xem bộ sưu tập / liên hệ.

## Brand Personality

**Ấm · Thủ công · Di sản Việt**

Cảm giác chính phải là **văn hóa Việt Nam** — không generic "craft aesthetic". Giọng điệu trân trọng, gần gũi. Không hô hào, không corporate. Typography và hình ảnh mang nhịp editorial chậm.

## Collection System

Sản phẩm tổ chức theo **bộ sưu tập → sản phẩm**, dữ liệu nằm trong `assets/data/catalog.json`.

- Landing đọc JSON để render tab collection + lưới sản phẩm.
- Click sản phẩm mở `product.html?id=<product-id>` (trang chi tiết riêng).
- **Bộ Di sản (hiện có):** Khuê Văn Các · Chùa Một Cột · Tháp Rùa Hồ Gươm.
- Thêm collection/sản phẩm mới: chỉ cần cập nhật JSON (+ ảnh trong `assets/img/`).
- Video mô tả lưu bằng URL Cloudinary trong `product.video.vi` và `product.video.en`; hiện trang chi tiết phát bản tiếng Việt.
- **Giá trị:** repeat purchase, cảm giác gom đủ bộ, dễ mở rộng catalog.

## Hero Requirements (landing)

Hero phải trả lời ngay:

1. **What is it?** — mô hình địa danh Việt Nam in 3D.
2. **Why is it different?** — thủ công, chi tiết, sưu tập theo bộ di sản Việt.
3. **What should I do next?** — xem bộ sưu tập / tìm hiểu thủ công.

**Suggested hero message:**

> Vietnamese landmark models, crafted in 3D.
> Collect a set of Vietnam's heritage — handmade, display-ready.

## Comparison / USP

| Quà lưu niệm thường | Hồn Tích Đất Việt |
| --- | --- |
| Chỉ để trang trí rồi quên | Thiết kế để trưng bày lâu dài |
| Không gắn với di sản cụ thể | Mỗi mô hình một địa danh Việt Nam |
| Gia công đại trà, ít chi tiết | In 3D chi tiết, hoàn thiện thủ công |
| Mua lẻ, không thành bộ | Sưu tập theo bộ — Di sản |

## Anti-references

- SaaS landing template: gradient hero, metric cards, eyebrow mọi section
- Cửa hàng lưu niệm rẻ tiền: màu chói, clutter
- AI slop: cream/sand body bg mặc định, card grid giống hệt, numbered markers vô nghĩa
- Glassmorphism trang trí, gradient text, side-stripe accent borders
- Định vị cũ: "quà có QR", "nhựa tái chế"

## Design Principles

1. **Văn hóa trước aesthetic** — visual gợi Việt Nam cụ thể.
2. **Vật thể là sản phẩm** — website phục vụ giới thiệu mô hình cầm trên tay.
3. **Kể chuyện ngắn, sâu** — mỗi section một ý.
4. **Thủ công có chủ ý** — texture, spacing, typography cảm giác làm tay.
5. **Tiếng Việt là first-class** — font và line-break đúng cho tiếng Việt có dấu.

## Accessibility & Inclusion

- WCAG 2.1 AA: contrast body ≥ 4.5:1, large text ≥ 3:1
- `prefers-reduced-motion`: tắt entrance animations
- Video background: pause control + fallback tĩnh
- `lang="vi"` trên HTML

## Priority Roadmap

**Priority 1 — Must do**

1. Landing rõ ràng: sản phẩm vật lý in 3D.
2. Collection System rõ trên trang (bộ Di sản).
3. Hero trả lời what / why / next trong vài giây.

**Priority 2 — Should do**

4. Motif văn hóa Việt Nam (5–10% diện tích).
5. Tinh chỉnh accent (gỗ cổ / sơn son thếp vàng cũ).

**Priority 3 — Nice to have**

6. Đường mua hàng / liên hệ phân phối rõ hơn.
7. Bộ sưu tập tiếp theo trên tab.
