// ─── CONFIRMATION OVERLAY (injected once into DOM) ────────────────────────────
function createConfirmationOverlay() {
    const overlay = document.createElement("div");
    overlay.id = "ivea-confirm-overlay";
    overlay.innerHTML = `
      <div id="ivea-confirm-backdrop"
        style="position:fixed;inset:0;background:rgba(0,0,0,0.85);backdrop-filter:blur(6px);z-index:9999;
       display:none;align-items:center;justify-content:center;padding:24px;
       opacity:0;transition:opacity 0.4s ease;">
  
        <div id="ivea-confirm-box"
          style="background:#020617;border:1px solid #1a2030;max-width:480px;width:100%;
                 padding:48px 40px;text-align:center;position:relative;
                 transform:translateY(24px);transition:transform 0.4s ease;opacity:0;">
  
          <!-- Close -->
          <button id="ivea-confirm-close"
            style="position:absolute;top:16px;right:20px;background:none;border:none;
                   color:#6b7280;font-size:18px;cursor:pointer;line-height:1;padding:4px 8px;"
            aria-label="Close">✕</button>
  
          <!-- Icon -->
          <div style="margin-bottom:24px;">
            <div style="display:inline-flex;align-items:center;justify-content:center;
                        width:56px;height:56px;border:1px solid rgba(34,197,94,0.35);">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none"
                stroke="#22c55e" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
                <polyline points="20 6 9 17 4 12"></polyline>
              </svg>
            </div>
          </div>
  
          <!-- Brand -->
          <div style="font-size:10px;letter-spacing:0.45em;text-transform:uppercase;
                      color:#22c55e;margin-bottom:14px;">IVÉA</div>
  
          <!-- Heading -->
          <div style="font-size:22px;letter-spacing:0.18em;text-transform:uppercase;
                      color:#f9fafb;font-weight:300;line-height:1.4;margin-bottom:16px;">
            Request Received
          </div>
  
          <!-- Divider -->
          <div style="width:36px;height:1px;background:linear-gradient(to right,#22c55e88,transparent);
                      margin:0 auto 20px;"></div>
  
          <!-- Message -->
          <p style="font-size:13px;color:#9ca3af;line-height:1.75;margin:0 0 10px;">
            Thank you for choosing IVÉA. Your consultation request has been received.
          </p>
          <p style="font-size:13px;color:#9ca3af;line-height:1.75;margin:0 0 28px;">
            Our concierge team will contact you within
            <span style="color:#e5e7eb;">2 hours</span> to confirm your appointment.
          </p>
  
          <!-- Booking summary -->
          <div id="ivea-confirm-summary"
            style="border:1px solid #1a2030;padding:16px 20px;text-align:left;margin-bottom:32px;">
          </div>
  
          <!-- Close CTA -->
          <button id="ivea-confirm-dismiss"
            style="width:100%;border:1px solid rgba(34,197,94,0.5);background:none;
                   color:#86efac;padding:14px;font-size:11px;letter-spacing:0.3em;
                   text-transform:uppercase;cursor:pointer;transition:all 0.3s ease;"
            onmouseover="this.style.background='rgba(34,197,94,0.12)'"
            onmouseout="this.style.background='none'">
            Done
          </button>
  
        </div>
      </div>
    `;
    document.body.appendChild(overlay);
}

// ─── SHOW CONFIRMATION ────────────────────────────────────────────────────────
function showConfirmation(payload) {
    const backdrop = document.getElementById("ivea-confirm-backdrop");
    const box = document.getElementById("ivea-confirm-box");
    const summary = document.getElementById("ivea-confirm-summary");

    if (!backdrop || !box) return;

    // Fill summary
    if (summary) {
        summary.innerHTML =
            summaryRow("Service", payload.service) +
            summaryRow("Preferred Date", payload.date || "Not specified") +
            summaryRow("Contact", payload.email);
    }

    // Animate in
    backdrop.style.display = "flex";
    requestAnimationFrame(() => {
        backdrop.style.opacity = "1";
        box.style.opacity = "1";
        box.style.transform = "translateY(0)";
    });

    // Close handlers
    const closeOverlay = () => {
        backdrop.style.opacity = "0";
        box.style.opacity = "0";
        box.style.transform = "translateY(24px)";
        setTimeout(() => { backdrop.style.display = "none"; }, 400);
    };

    document.getElementById("ivea-confirm-close").onclick = closeOverlay;
    document.getElementById("ivea-confirm-dismiss").onclick = closeOverlay;

    // Click outside box to close
    backdrop.onclick = (e) => {
        if (e.target === backdrop) closeOverlay();
    };
}

function summaryRow(label, value) {
    return (
        '<div style="display:flex;justify-content:space-between;align-items:flex-start;' +
        'padding:8px 0;border-bottom:1px solid #0f172a;">' +
        '<span style="font-size:10px;letter-spacing:0.28em;text-transform:uppercase;color:#6b7280;">' +
        label + '</span>' +
        '<span style="font-size:12px;color:#e5e7eb;text-align:right;max-width:60%;">' +
        value + '</span>' +
        '</div>'
    );
}

// ─── LOADING STATE HELPERS ────────────────────────────────────────────────────
function setLoading(btn, isLoading) {
    if (!btn) return;
    if (isLoading) {
        btn.disabled = true;
        btn.classList.add("opacity-70", "cursor-not-allowed");
        btn.innerHTML =
            '<span style="display:inline-flex;align-items:center;justify-content:center;gap:10px;">' +
            '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"' +
            ' stroke-linecap="round" stroke-linejoin="round"' +
            ' style="animation:ivea-spin 0.8s linear infinite;">' +
            '<path d="M21 12a9 9 0 1 1-6.219-8.56"/></svg>' +
            'Processing…</span>';
    } else {
        btn.disabled = false;
        btn.classList.remove("opacity-70", "cursor-not-allowed");
        btn.innerHTML = 'Request Consultation <span class="ml-2 group-hover:translate-x-1 inline-block transition-transform">→</span>';
    }
}

// Inject spinner keyframe once
(function injectSpinnerCSS() {
    if (document.getElementById("ivea-spin-style")) return;
    const style = document.createElement("style");
    style.id = "ivea-spin-style";
    style.textContent = "@keyframes ivea-spin { to { transform: rotate(360deg); } }";
    document.head.appendChild(style);
})();

// ─── MAIN FORM HANDLER ────────────────────────────────────────────────────────
const consultationForm = document.querySelector("#consultation-form");

if (consultationForm) {
    // Build overlay once
    createConfirmationOverlay();

    const statusEl = consultationForm.querySelector(".form-status");
    const submitBtn = consultationForm.querySelector('button[type="submit"]');

    // Replace with your deployed Apps Script Web App URL
    const APPS_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbx-D0w9DfdTOj1L3bZJ7Hhp86B5lPHhyNfq9vP6T9gsohx8RSwBt6oAhTd0O9F81r4nng/exec";

    consultationForm.addEventListener("submit", async (e) => {
        e.preventDefault();

        if (statusEl) {
            statusEl.textContent = "";
            statusEl.classList.remove("text-emerald-300", "text-red-400");
        }

        const formData = new FormData(consultationForm);
        const payload = {
            name: (formData.get("name") || "").toString().trim(),
            phone: (formData.get("phone") || "").toString().trim(),
            email: (formData.get("email") || "").toString().trim(),
            service: (formData.get("service") || "").toString().trim(),
            date: (formData.get("date") || "").toString().trim(),
            message: (formData.get("message") || "").toString().trim(),
        };

        setLoading(submitBtn, true);

        try {
            const params = new URLSearchParams();
            params.append("name", payload.name);
            params.append("phone", payload.phone);
            params.append("email", payload.email);
            params.append("service", payload.service);
            params.append("date", payload.date);
            params.append("message", payload.message);

            const res = await fetch(APPS_SCRIPT_URL, { method: "POST", body: params });
            const text = await res.text();
            let data;

            try {
                data = JSON.parse(text);
            } catch (_) {
                throw new Error("Unexpected server response.");
            }

            if (data.status === "success") {
                consultationForm.reset();
                consultationForm.querySelectorAll("input, textarea, select").forEach((el) => el.blur());

                // Show luxury confirmation overlay
                showConfirmation(payload);

            } else {
                throw new Error(data.message || "Unable to process request.");
            }

        } catch (error) {
            console.error("Booking error:", error);
            if (statusEl) {
                statusEl.textContent = "We were unable to complete your request. Please try again shortly.";
                statusEl.classList.add("text-red-400");
            }
        } finally {
            setLoading(submitBtn, false);
        }
    });
}
