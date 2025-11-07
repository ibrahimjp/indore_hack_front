# Quick Testing Guide

## 🚀 Getting Started

### 1. Start the Application
```bash
npm run dev
```

The app should open at `http://localhost:5173`

---

## ✅ Test Scenarios

### Scenario 1: User Registration & Login

#### Steps:
1. Click the **"Login"** button in the navbar (green button on the right)
2. Click **"Sign Up"** tab in the modal
3. Fill in:
   - Full Name: `John Doe`
   - Email: `john@test.com`
   - Password: `password123`
4. Click **"Create Account"**

#### Expected Results:
- ✅ Green toast notification: "Registration successful!"
- ✅ Modal closes
- ✅ User avatar appears in navbar (top right)
- ✅ **NO blank screen** (this was the bug we fixed!)
- ✅ Homepage stays visible

#### If Already Registered:
1. Click **"Sign In"** tab
2. Enter email and password
3. Click **"Sign In"**

---

### Scenario 2: View Dynamic Doctors

#### Steps:
1. Click **"Find Doctor"** in the navbar
2. Wait for doctors to load

#### Expected Results:
- ✅ Doctors from backend database appear (not static data)
- ✅ Real doctor images display
- ✅ Each card shows: name, specialty, experience, description
- ✅ Search bar works (try typing a doctor name)
- ✅ Specialty filter works (try selecting a specialty)

#### Test Search:
- Type any doctor's name in search box
- Results filter in real-time

#### Test Filter:
- Select a specialty from dropdown
- Only doctors of that specialty show

---

### Scenario 3: Book an Appointment (Main Feature!)

#### Steps:
1. On the Find Doctor page, click **"Book Now"** on any doctor
2. Booking modal opens

#### Modal Contents:
- ✅ Doctor info (name, specialty, fee) at top
- ✅ Next 7 days with slot counts
- ✅ Green border on selected date

#### Booking Process:
1. **Select a Date:**
   - Click any date with available slots
   - Slot count shows (e.g., "8 Slots")
   - Fully booked dates are grayed out

2. **Select a Time:**
   - Time slots appear (10:00 AM - 9:00 PM)
   - Only available slots show
   - Booked slots are hidden
   - Click any time slot

3. **Review Summary:**
   - Green summary box appears
   - Shows: Date, Time, Consultation Fee

4. **Book:**
   - Click **"Book Appointment"** button
   - Button shows "Booking..." during process

#### Expected Results:
- ✅ Green toast: "Appointment booked successfully!"
- ✅ Modal closes
- ✅ Redirects to `/appointments` page
- ✅ New appointment appears in the list

---

### Scenario 4: View My Appointments

#### Steps:
1. Click your **avatar** in navbar (top right)
2. Click **"My Appointments"** from dropdown

OR

1. Navigate to `/appointments` directly

#### Expected Results:
- ✅ All booked appointments display as cards
- ✅ Each card shows:
  - Doctor info (photo, name, specialty)
  - Date and time
  - Consultation fee
  - Status (Payment Pending/Confirmed/Cancelled)
  - Action buttons

#### Test Payment:
1. Find appointment with "Payment Pending" status
2. Click **"Pay Now"** button
3. ✅ Payment processes
4. ✅ Status changes to "Confirmed"
5. ✅ Green checkmark appears

#### Test Cancellation:
1. Find appointment with "Payment Pending" status
2. Click **"Cancel"** button
3. ✅ Appointment status changes to "Cancelled"
4. ✅ Red X appears

---

### Scenario 5: User Profile

#### Steps:
1. Click your **avatar** in navbar
2. Click **"My Profile"** from dropdown

OR

1. Navigate to `/profile` directly

#### View Mode:
- ✅ Profile picture displays
- ✅ All user info shows (read-only)

#### Edit Mode:
1. Click **"Edit Profile"** button
2. Update any field (name, phone, address, etc.)
3. Upload new profile picture (optional)
4. Click **"Save Changes"**

#### Expected Results:
- ✅ Green toast: "Profile updated successfully!"
- ✅ Changes reflect immediately
- ✅ New photo appears in navbar avatar

---

### Scenario 6: User Logout

#### Steps:
1. Click your **avatar** in navbar
2. Click **"Logout"** from dropdown (red option at bottom)

#### Expected Results:
- ✅ User logged out
- ✅ Navbar shows "Login" button again
- ✅ Redirected to homepage

---

## 🐛 What We Fixed

### Issue 1: Blank Screen After Login ✅
**Before:** Screen went blank, needed page reload to see user logged in
**After:** Smooth login, no blank screen, immediate UI update

### Issue 2: Static Doctor Data ✅
**Before:** Showed hardcoded fake doctors
**After:** Real doctors from database with actual images and info

### Issue 3: Booking Not Working ✅
**Before:** "Book Now" just showed alert, didn't actually book
**After:** Full booking system with backend integration, slot management, and confirmation

---

## 🔍 Things to Check

### Authentication:
- [ ] Login works without blank screen
- [ ] Registration creates new user
- [ ] User avatar shows after login
- [ ] Logout works properly
- [ ] Protected routes require login

### Doctor Listing:
- [ ] Doctors load from backend
- [ ] Images display correctly
- [ ] Search filters work
- [ ] Specialty filter works
- [ ] "Book Now" opens modal

### Booking System:
- [ ] Dates show correct slot counts
- [ ] Fully booked dates are disabled
- [ ] Only available time slots appear
- [ ] Can't book without login
- [ ] Booking saves to database
- [ ] Redirect to appointments after booking

### Appointments Page:
- [ ] All appointments display
- [ ] Status shows correctly
- [ ] Payment works
- [ ] Cancellation works
- [ ] Dates/times format correctly

### Profile Page:
- [ ] Data displays correctly
- [ ] Edit mode works
- [ ] Save updates database
- [ ] Image upload works
- [ ] Changes reflect in navbar

---

## 🚨 Common Issues & Solutions

### Issue: "Failed to fetch doctors"
**Solution:** Make sure backend is running on `http://localhost:5000`

### Issue: "Please login to book an appointment"
**Solution:** You need to login first before booking

### Issue: No time slots available
**Solution:** All slots for that date are booked, try another date

### Issue: Toast notifications not showing
**Solution:** Check browser console for errors, ensure react-toastify is installed

### Issue: Images not loading
**Solution:** Check internet connection, images are from backend/cloudinary

---

## 📱 Mobile Testing

### Steps:
1. Open browser DevTools (F12)
2. Toggle device toolbar (Ctrl+Shift+M)
3. Select mobile device (iPhone, iPad, etc.)

### Test on Mobile:
- [ ] Navbar hamburger menu works
- [ ] User info shows in mobile menu
- [ ] Doctor cards stack vertically
- [ ] Booking modal is responsive
- [ ] Forms are touch-friendly
- [ ] Toast notifications appear correctly

---

## ✨ Expected User Experience

### Smooth Flow:
1. User visits site
2. Clicks "Login" → Quick registration/login
3. Browses real doctors from database
4. Selects doctor → Clicks "Book Now"
5. Chooses date and available time slot
6. Books appointment → Sees confirmation
7. Redirected to appointments page
8. Can manage appointments (pay/cancel)
9. Can update profile anytime
10. Smooth logout experience

### No More Issues:
- ❌ No blank screens
- ❌ No static/fake data
- ❌ No broken booking flow
- ✅ Everything works end-to-end!

---

## 🎯 Success Criteria

Your testing is successful if:
- ✅ Login is smooth with no blank screen
- ✅ Real doctors appear from backend
- ✅ You can successfully book an appointment
- ✅ Appointment appears in your appointments list
- ✅ All CRUD operations work (Create, Read, Update, Delete)
- ✅ Toast notifications guide the user
- ✅ UI is responsive and looks good
- ✅ No console errors

---

## 📞 Need Help?

If something doesn't work:
1. Check browser console for errors (F12)
2. Verify backend is running
3. Check network tab for API calls
4. Ensure you're logged in for protected actions
5. Clear localStorage and try again: `localStorage.clear()`

---

Happy Testing! 🎉