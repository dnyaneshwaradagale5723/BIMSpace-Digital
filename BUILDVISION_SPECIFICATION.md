# BuildVision Studio
## Master Enterprise Specification: Civil Engineering + Architecture + 2D/3D BIM + Digital Client Portals

This comprehensive system specification defines the complete data architecture, role management, 33 core services, 20-step delivery pipeline, quotation generator, and AI assistant modules for **BuildVision Studio**.

---

## 1. Brand Identity
- **Agency Name:** BuildVision Studio
- **Tagline:** “From Plan to Reality.” / “Your Complete Home Design & Digital Solution.”
- **Visual Monogram:** Interlocking geometric 'B' and 'V' formed by an isometric building column emerging from a 2D CAD blueprint grid.
- **Palette:** Slate-950 (`#020617`), Blueprint Cyan (`#06B6D4`), Construction Amber/Gold (`#F59E0B`), and Emerald (`#10B981`).

---

## 2. Comprehensive Service Taxonomy (33 Services)

### Category A: Civil & Architectural Engineering (01-20)
1. **2D House Plan:** NBC 2016 and municipal bylaws compliant spatial planning.
2. **Working Drawings:** Structural dimensioning, center-line plans, and column schedules.
3. **Floor Plans:** Furniture layouts, circulation paths, and Vastu orientation.
4. **Elevation:** Front, rear, and side elevations with material callouts.
5. **Section:** Cross and longitudinal sectional elevations detailing slab heights.
6. **Structural Design:** RCC frame design, beam reinforcement schedules, slab design (IS 456).
7. **Site Planning:** Contour leveling, setbacks, ingress/egress, and rainwater drainage.
8. **Survey Support:** Total station boundary survey and contour mapping.
9. **Quantity Takeoff:** Granular measurement sheets for cement, sand, aggregate, and steel.
10. **Estimation:** Comprehensive cost forecasting based on current DSR rates.
11. **BOQ (Bill of Quantities):** Itemized breakdown with specifications, units, and rates.
12. **Tender / Quotation Support:** Item-rate tender preparation and contractor rate comparison.
13. **Interior Planning:** False ceiling, electrical layouts, modular kitchen design.
14. **Exterior Design:** Modern facade treatments, louvers, ACP panels, and stone cladding.
15. **3D House Model:** Full volumetric massing in SketchUp/Revit/BIM.
16. **3D Interior:** Photorealistic ray-traced internal views with realistic lighting.
17. **3D Exterior:** Photorealistic daytime and dusk perspective renders.
18. **Walkthrough / Visualization:** 4K 60fps Lumion/Unreal Engine cinematic walkthrough.
19. **Renovation / Modification Planning:** Structural retrofitting and load redistribution.
20. **As-Built Documentation:** Post-execution CAD drawings reflecting on-site alterations.

### Category B: Digital Services (21-28)
21. **Website Development:** High-speed client presentation web apps and landing pages.
22. **Business Website:** Multi-page corporate platforms for builders and contractors.
23. **Portfolio Website:** Architect interactive design archives.
24. **Graphic Design:** Branding, brochures, signages, and sales decks.
25. **Video Editing:** Construction milestone drone videos and 4K reel presentations.
26. **Motion Graphics:** Isometric construction phase diagrams and animated floorplans.
27. **Social Media Content:** Instagram / LinkedIn technical reels and architectural carousels.
28. **Digital Marketing:** Google Local Ads and Meta lead generation for plot/villa owners.

### Category C: AI-Assisted Services (29-33)
29. **AI-assisted Research:** Local municipal bye-laws, NBC clauses, and zoning restrictions.
30. **AI-assisted Documentation:** Structural audit summaries and contractor contract clauses.
31. **AI-assisted Content Creation:** Architectural project briefs, SEO articles, and brochures.
32. **AI-assisted Website Development:** Automatic single-click client digital twin deployment.
33. **AI Automation Solutions:** WhatsApp automated status updates and lead nurturing bots.

---

## 3. 20-Step Work Process Timeline
`01 Requirement` ➔ `02 Site Data` ➔ `03 Survey` ➔ `04 Concept` ➔ `05 Planning` ➔ `06 2D Drawings` ➔ `07 3D Model` ➔ `08 Structural Coord` ➔ `09 MEP Coord` ➔ `10 Working Drawings` ➔ `11 Quantity Takeoff` ➔ `12 Estimation` ➔ `13 BOQ` ➔ `14 Tender / Quotation` ➔ `15 Execution Support` ➔ `16 Measurement` ➔ `17 Billing` ➔ `18 Revision` ➔ `19 As-Built Drawings` ➔ `20 Handover Documentation`.

---

## 4. Database Schema (PostgreSQL Relational Structure)

```sql
-- Role Enum
CREATE TYPE user_role AS ENUM ('admin', 'staff', 'client');
CREATE TYPE lead_status AS ENUM ('new', 'contacted', 'requirement_collected', 'quotation_sent', 'advance_paid', 'in_progress', 'review', 'revision', 'completed', 'handover');
CREATE TYPE payment_status AS ENUM ('pending', 'partial', 'paid', 'refunded');

-- 1. Users Table
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    full_name VARCHAR(150) NOT NULL,
    phone VARCHAR(30),
    role user_role DEFAULT 'client',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 2. Leads Table
CREATE TABLE leads (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    lead_code VARCHAR(30) UNIQUE NOT NULL, -- e.g. BV-LEAD-2026-001
    full_name VARCHAR(150) NOT NULL,
    phone VARCHAR(30) NOT NULL,
    email VARCHAR(255),
    city VARCHAR(100),
    project_type VARCHAR(100), -- Villa, Commercial, Renovation, Apartment
    plot_size VARCHAR(100),
    builtup_area NUMERIC,
    floors INT DEFAULT 1,
    service_2d BOOLEAN DEFAULT TRUE,
    service_3d BOOLEAN DEFAULT TRUE,
    service_interior BOOLEAN DEFAULT FALSE,
    service_exterior BOOLEAN DEFAULT TRUE,
    service_estimation BOOLEAN DEFAULT TRUE,
    service_boq BOOLEAN DEFAULT TRUE,
    service_website BOOLEAN DEFAULT TRUE,
    expected_timeline VARCHAR(100),
    budget_range VARCHAR(100),
    message TEXT,
    document_url TEXT,
    status lead_status DEFAULT 'new',
    assigned_to UUID REFERENCES users(id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 3. Projects Table
CREATE TABLE projects (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    project_slug VARCHAR(120) UNIQUE NOT NULL,
    client_id UUID REFERENCES users(id) ON DELETE CASCADE,
    title VARCHAR(200) NOT NULL,
    location VARCHAR(200),
    plot_dimensions VARCHAR(100),
    total_area_sqft NUMERIC NOT NULL,
    estimated_budget NUMERIC,
    stage_index INT DEFAULT 1, -- 1 to 20 matching 20-step process
    current_stage_name VARCHAR(100) DEFAULT 'Concept Planning',
    cloud_expires_at TIMESTAMP WITH TIME ZONE,
    status VARCHAR(50) DEFAULT 'active',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 4. Quotations Table
CREATE TABLE quotations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    quote_number VARCHAR(50) UNIQUE NOT NULL, -- e.g. BV-QT-2026-104
    project_id UUID REFERENCES projects(id) ON DELETE CASCADE,
    client_id UUID REFERENCES users(id),
    subtotal NUMERIC NOT NULL,
    tax_percent NUMERIC DEFAULT 18.0,
    tax_amount NUMERIC NOT NULL,
    discount_amount NUMERIC DEFAULT 0,
    total_amount NUMERIC NOT NULL,
    valid_until DATE NOT NULL,
    terms_conditions TEXT,
    status VARCHAR(50) DEFAULT 'draft',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 5. Quotation Line Items
CREATE TABLE quotation_items (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    quotation_id UUID REFERENCES quotations(id) ON DELETE CASCADE,
    service_name VARCHAR(200) NOT NULL,
    description TEXT,
    quantity NUMERIC DEFAULT 1,
    unit VARCHAR(30) DEFAULT 'Sq.Ft',
    rate NUMERIC NOT NULL,
    amount NUMERIC NOT NULL
);

-- 6. Project Files & Vault
CREATE TABLE project_files (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    project_id UUID REFERENCES projects(id) ON DELETE CASCADE,
    file_name VARCHAR(255) NOT NULL,
    file_category VARCHAR(50), -- 'sanction_pdf', 'cad_dwg', 'render_3d', 'boq_xlsx'
    file_url TEXT NOT NULL,
    file_size_kb INT,
    sha256_hash VARCHAR(64),
    uploaded_by UUID REFERENCES users(id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
```
