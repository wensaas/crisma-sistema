// =============================================
// TIENDA CRISMA — SISTEMA DE GESTIÓN
// WenSAAS · 2026
// =============================================

const App = {
  user: null,
  userData: null,
  view: null,
  unsubs: [],   // Firestore unsubscribe functions
};

// ---- ICONS SVG ----
const ico = {
  dashboard: '<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"/></svg>',
  inventario: '<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"/></svg>',
  clientes: '<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z"/></svg>',
  creditos: '<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"/></svg>',
  ingresos: '<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/></svg>',
  egresos: '<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 12H4"/></svg>',
  liquidacion: '<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/></svg>',
  plus: '<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/></svg>',
  edit: '<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/></svg>',
  trash: '<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg>',
  pay: '<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"/></svg>',
  search: '<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>',
  warn: '<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/></svg>',
  check: '<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/></svg>',
  info: '<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>',
  eye: '<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/></svg>',
};

// ---- NAV CONFIG ----
const NAV = {
  admin: [
    { view: 'dashboard', label: 'Dashboard', icon: 'dashboard' },
    { view: 'inventario', label: 'Inventario', icon: 'inventario' },
    { view: 'clientes', label: 'Clientes', icon: 'clientes' },
    { view: 'creditos', label: 'Créditos', icon: 'creditos' },
    { view: 'ingresos', label: 'Ingresos', icon: 'ingresos' },
    { view: 'egresos', label: 'Egresos', icon: 'egresos' },
    { view: 'liquidacion', label: 'Liquidación', icon: 'liquidacion' },
  ],
  cajero: [
    { view: 'nueva-venta', label: 'Registrar Venta', icon: 'ingresos' },
    { view: 'clientes', label: 'Clientes', icon: 'clientes' },
    { view: 'creditos', label: 'Créditos', icon: 'creditos' },
  ],
};

// =============================================
// UTILITIES
// =============================================

function $id(id) { return document.getElementById(id); }

function fmtMoney(n) {
  return '$' + Number(n || 0).toLocaleString('es-CL');
}

function fmtDate(ts) {
  if (!ts) return '—';
  const d = ts.toDate ? ts.toDate() : new Date(ts);
  return d.toLocaleDateString('es-CL', { day: '2-digit', month: '2-digit', year: 'numeric' });
}

function fmtDatetime(ts) {
  if (!ts) return '—';
  const d = ts.toDate ? ts.toDate() : new Date(ts);
  return d.toLocaleDateString('es-CL', { day: '2-digit', month: '2-digit', year: 'numeric' }) +
    ' ' + d.toLocaleTimeString('es-CL', { hour: '2-digit', minute: '2-digit' });
}

function todayStr() {
  const d = new Date();
  return d.toISOString().slice(0, 10);
}

function parseLocalDate(str) {
  if (!str) return new Date();
  const [y, m, d] = str.split('-').map(Number);
  return new Date(y, m - 1, d);
}

function dayStart(dateStr) {
  const d = parseLocalDate(dateStr);
  d.setHours(0, 0, 0, 0);
  return d;
}

function dayEnd(dateStr) {
  const d = parseLocalDate(dateStr);
  d.setHours(23, 59, 59, 999);
  return d;
}

function showToast(msg, type = 'success') {
  const icons = { success: ico.check, error: ico.warn, info: ico.info };
  const c = $id('toast-container');
  const t = document.createElement('div');
  t.className = `toast toast-${type}`;
  t.innerHTML = `${icons[type] || ''}<span>${msg}</span>`;
  c.prepend(t);
  setTimeout(() => t.remove(), 3500);
}

function openModal(title, html, opts = {}) {
  $id('modal-title').textContent = title;
  $id('modal-body').innerHTML = html;
  const box = $id('modal-box');
  box.className = 'modal' + (opts.lg ? ' modal-lg' : opts.sm ? ' modal-sm' : '');
  $id('modal-overlay').classList.remove('hidden');
}

function closeModal() {
  $id('modal-overlay').classList.add('hidden');
  $id('modal-body').innerHTML = '';
}

function openConfirm(msg, onOk) {
  $id('confirm-msg').textContent = msg;
  $id('confirm-overlay').classList.remove('hidden');
  const ok = $id('confirm-ok');
  const newOk = ok.cloneNode(true);
  ok.replaceWith(newOk);
  newOk.addEventListener('click', () => { $id('confirm-overlay').classList.add('hidden'); onOk(); });
}

function clearUnsubs() {
  App.unsubs.forEach(fn => { try { fn(); } catch(e) {} });
  App.unsubs = [];
}

// =============================================
// AUTH
// =============================================

auth.onAuthStateChanged(async (user) => {
  if (user) {
    try {
      const snap = await db.collection('usuarios').doc(user.uid).get();
      if (!snap.exists || !snap.data().activo) {
        await auth.signOut();
        return;
      }
      App.user = user;
      App.userData = { uid: user.uid, ...snap.data() };
      showApp();
    } catch(e) {
      showLogin();
    }
  } else {
    App.user = null;
    App.userData = null;
    showLogin();
  }
  $id('loading-screen').classList.add('hidden');
});

function showLogin() {
  $id('app').classList.add('hidden');
  $id('login-screen').classList.remove('hidden');
}

function showApp() {
  $id('login-screen').classList.add('hidden');
  $id('app').classList.remove('hidden');
  buildSidebar();
  navigate(App.userData.rol === 'cajero' ? 'nueva-venta' : 'dashboard');
}

$id('login-form').addEventListener('submit', async (e) => {
  e.preventDefault();
  const btn = $id('login-btn');
  const errEl = $id('login-error');
  btn.disabled = true;
  btn.textContent = 'Ingresando…';
  errEl.classList.add('hidden');
  try {
    await auth.signInWithEmailAndPassword(
      $id('inp-email').value.trim(),
      $id('inp-password').value
    );
  } catch(err) {
    let msg = 'Error al ingresar. Verifica tus credenciales.';
    if (err.code === 'auth/user-not-found' || err.code === 'auth/wrong-password' || err.code === 'auth/invalid-credential') msg = 'Correo o contraseña incorrectos.';
    if (err.code === 'auth/too-many-requests') msg = 'Demasiados intentos. Intenta más tarde.';
    errEl.textContent = msg;
    errEl.classList.remove('hidden');
  } finally {
    btn.disabled = false;
    btn.textContent = 'Ingresar';
  }
});

$id('logout-btn').addEventListener('click', async () => {
  clearUnsubs();
  await auth.signOut();
});

// =============================================
// SIDEBAR + NAVIGATION
// =============================================

function buildSidebar() {
  const ud = App.userData;
  $id('sidebar-user').innerHTML = `
    <div class="user-name">${ud.nombre}</div>
    <span class="user-role ${ud.rol}">${ud.rol === 'admin' ? 'Administrador' : 'Cajero'}</span>
  `;

  const navItems = NAV[ud.rol] || [];
  $id('sidebar-nav').innerHTML = navItems.map(n => `
    <a data-view="${n.view}" onclick="navigate('${n.view}')" id="nav-${n.view}">
      ${ico[n.icon]}${n.label}
    </a>
  `).join('');
}

function navigate(view) {
  clearUnsubs();
  App.view = view;

  // Update active nav
  document.querySelectorAll('.sidebar-nav a').forEach(a => {
    a.classList.toggle('active', a.dataset.view === view);
  });

  // Close mobile sidebar
  $id('sidebar').classList.remove('open');
  $id('sidebar-overlay').classList.remove('visible');

  const views = {
    dashboard: loadDashboard,
    inventario: loadInventario,
    clientes: loadClientes,
    creditos: loadCreditos,
    ingresos: loadIngresos,
    egresos: loadEgresos,
    liquidacion: loadLiquidacion,
    'nueva-venta': loadNuevaVenta,
  };

  if (views[view]) views[view]();
  else $id('view-container').innerHTML = `<div class="view"><p>Vista no encontrada.</p></div>`;
}

// Mobile sidebar toggle
$id('sidebar-toggle').addEventListener('click', () => {
  $id('sidebar').classList.toggle('open');
  $id('sidebar-overlay').classList.toggle('visible');
});
$id('sidebar-overlay').addEventListener('click', () => {
  $id('sidebar').classList.remove('open');
  $id('sidebar-overlay').classList.remove('visible');
});

// Modal close
$id('modal-close').addEventListener('click', closeModal);
$id('modal-overlay').addEventListener('click', (e) => { if (e.target === $id('modal-overlay')) closeModal(); });
$id('confirm-close').addEventListener('click', () => $id('confirm-overlay').classList.add('hidden'));
$id('confirm-cancel').addEventListener('click', () => $id('confirm-overlay').classList.add('hidden'));

// =============================================
// DASHBOARD
// =============================================

async function loadDashboard() {
  $id('view-container').innerHTML = `
    <div class="view">
      <div class="view-header">
        <div class="view-header-left">
          <h2>Dashboard</h2>
          <p>Resumen general de Tienda Crisma</p>
        </div>
      </div>
      <div class="stat-grid" id="dash-stats">
        <div class="stat-card stat-clickable" onclick="navigate('inventario')" title="Ver inventario"><div class="stat-icon navy">${ico.inventario}</div><div class="stat-label">Productos</div><div class="stat-value" id="d-productos">—</div></div>
        <div class="stat-card stat-clickable" onclick="navigate('clientes')" title="Ver clientes"><div class="stat-icon blue">${ico.clientes}</div><div class="stat-label">Clientes</div><div class="stat-value" id="d-clientes">—</div><div class="stat-sub" style="color:var(--blue);font-size:11px;margin-top:4px">Ver todos →</div></div>
        <div class="stat-card stat-clickable" onclick="navigate('creditos')" title="Ver créditos"><div class="stat-icon warning">${ico.creditos}</div><div class="stat-label">Créditos activos</div><div class="stat-value" id="d-creditos">—</div><div class="stat-sub" id="d-creditos-monto"></div></div>
        <div class="stat-card stat-clickable" onclick="navigate('ingresos')" title="Ver ingresos"><div class="stat-icon teal">${ico.ingresos}</div><div class="stat-label">Ingresos hoy</div><div class="stat-value" id="d-ingresos">—</div></div>
        <div class="stat-card stat-clickable" onclick="navigate('egresos')" title="Ver egresos"><div class="stat-icon danger">${ico.egresos}</div><div class="stat-label">Egresos hoy</div><div class="stat-value" id="d-egresos">—</div></div>
        <div class="stat-card stat-clickable" onclick="navigate('liquidacion')" title="Ver liquidación"><div class="stat-icon navy">${ico.liquidacion}</div><div class="stat-label">Balance hoy</div><div class="stat-value" id="d-balance">—</div></div>
      </div>
      <div class="dashboard-grid">
        <div class="card">
          <div class="card-header"><h3>Actividad reciente</h3></div>
          <div class="card-body" id="d-actividad"><p class="text-muted text-center" style="padding:20px">Cargando…</p></div>
        </div>
        <div class="card">
          <div class="card-header"><h3>${ico.warn} Stock bajo</h3></div>
          <div class="card-body" id="d-stock-bajo"><p class="text-muted text-center" style="padding:20px">Cargando…</p></div>
        </div>
      </div>
      <div class="card" style="margin-top:20px">
        <div class="card-header" style="justify-content:space-between">
          <h3>${ico.creditos} Créditos pendientes por cobrar</h3>
          <span id="d-cred-total-badge" style="font-weight:700;color:var(--danger);font-size:15px">—</span>
        </div>
        <div class="table-wrapper">
          <table>
            <thead><tr><th>Cliente</th><th>Monto original</th><th>Pendiente</th><th>Vencimiento</th><th>Estado</th><th></th></tr></thead>
            <tbody id="d-cred-tbody"><tr><td colspan="6" class="table-empty">Cargando…</td></tr></tbody>
          </table>
        </div>
      </div>
    </div>
  `;

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const tomorrow = new Date(today); tomorrow.setDate(tomorrow.getDate() + 1);

  const [prods, clts, creds, ing, egr] = await Promise.all([
    db.collection('productos').where('activo', '==', true).get(),
    db.collection('clientes').where('activo', '==', true).get(),
    db.collection('creditos').where('estado', '==', 'activo').get(),
    db.collection('ingresos').where('fecha', '>=', today).where('fecha', '<', tomorrow).get(),
    db.collection('egresos').where('fecha', '>=', today).where('fecha', '<', tomorrow).get(),
  ]);

  const totalIng = ing.docs.reduce((s, d) => s + (d.data().monto || 0), 0);
  const totalEgr = egr.docs.reduce((s, d) => s + (d.data().monto || 0), 0);
  const totalCred = creds.docs.reduce((s, d) => s + (d.data().saldo_pendiente || 0), 0);

  $id('d-productos').textContent = prods.size;
  $id('d-clientes').textContent = clts.size;
  $id('d-creditos').textContent = creds.size;
  $id('d-creditos-monto').textContent = fmtMoney(totalCred) + ' pendiente';
  $id('d-ingresos').textContent = fmtMoney(totalIng);
  $id('d-egresos').textContent = fmtMoney(totalEgr);
  const balance = totalIng - totalEgr;
  const balEl = $id('d-balance');
  balEl.textContent = fmtMoney(balance);
  balEl.style.color = balance >= 0 ? 'var(--teal-dark)' : 'var(--danger)';

  // Recent activity (last 10 ingresos + egresos)
  const [recentIng, recentEgr] = await Promise.all([
    db.collection('ingresos').orderBy('fecha', 'desc').limit(5).get(),
    db.collection('egresos').orderBy('fecha', 'desc').limit(5).get(),
  ]);
  const activities = [
    ...recentIng.docs.map(d => ({ ...d.data(), type: 'income' })),
    ...recentEgr.docs.map(d => ({ ...d.data(), type: 'expense' })),
  ].sort((a, b) => {
    const ta = a.fecha?.toDate ? a.fecha.toDate() : new Date(0);
    const tb = b.fecha?.toDate ? b.fecha.toDate() : new Date(0);
    return tb - ta;
  }).slice(0, 8);

  $id('d-actividad').innerHTML = activities.length ? activities.map(a => `
    <div class="activity-item">
      <div class="activity-dot ${a.type}">${a.type === 'income' ? '↑' : '↓'}</div>
      <div>
        <div class="act-concept">${a.concepto || '—'}</div>
        <div class="act-meta">${fmtDate(a.fecha)}</div>
      </div>
      <div class="act-amount ${a.type === 'income' ? 'amount-income' : 'amount-expense'}">
        ${a.type === 'income' ? '+' : '-'}${fmtMoney(a.monto)}
      </div>
    </div>
  `).join('') : '<p class="text-muted text-center" style="padding:20px">Sin actividad reciente</p>';

  // Low stock
  const lowStock = prods.docs.filter(d => {
    const p = d.data();
    return p.stock <= (p.stock_minimo || 5);
  });
  $id('d-stock-bajo').innerHTML = lowStock.length ? lowStock.map(d => {
    const p = d.data();
    return `<div class="alert-item">${ico.warn}<div><div class="alert-name">${p.nombre}</div><div class="alert-sub">Stock: ${p.stock} / Mínimo: ${p.stock_minimo || 5}</div></div></div>`;
  }).join('') : '<p class="text-muted text-center" style="padding:20px">Sin alertas de stock</p>';

  // Credits pending table
  const credsList = creds.docs.map(d => ({ id: d.id, ...d.data() }))
    .sort((a, b) => (b.saldo_pendiente || 0) - (a.saldo_pendiente || 0));
  const totalCredPendiente = credsList.reduce((s, c) => s + (c.saldo_pendiente || 0), 0);
  const badge = $id('d-cred-total-badge');
  if (badge) badge.textContent = 'Total: ' + fmtMoney(totalCredPendiente);
  const estadoBadge = { activo: 'badge-info', pagado: 'badge-success', vencido: 'badge-danger' };
  const credTbody = $id('d-cred-tbody');
  if (credTbody) {
    credTbody.innerHTML = credsList.length ? credsList.map(c => `
      <tr>
        <td><strong>${c.cliente_nombre || '—'}</strong></td>
        <td>${fmtMoney(c.monto_original)}</td>
        <td class="fw-700 amount-expense">${fmtMoney(c.saldo_pendiente)}</td>
        <td>${fmtDate(c.fecha_vencimiento)}</td>
        <td><span class="badge ${estadoBadge[c.estado] || 'badge-neutral'}">${c.estado}</span></td>
        <td>
          <button class="btn btn-sm btn-success" onclick="showRegistrarPagoModal('${c.id}','${esc(c.cliente_nombre||'')}',${c.saldo_pendiente||0})">
            ${ico.pay} Registrar abono
          </button>
        </td>
      </tr>
    `).join('') : '<tr><td colspan="6" class="table-empty">Sin créditos activos</td></tr>';
  }
}

// =============================================
// INVENTARIO
// =============================================

async function loadInventario() {
  const isAdmin = App.userData.rol === 'admin';
  $id('view-container').innerHTML = `
    <div class="view">
      <div class="view-header">
        <div class="view-header-left">
          <h2>Inventario</h2>
          <p>Control de productos y stock</p>
        </div>
        ${isAdmin ? `<button class="btn btn-primary" onclick="showAddProductoModal()">${ico.plus} Agregar producto</button>` : ''}
      </div>
      <div class="card">
        <div class="table-toolbar">
          <div class="search-box">${ico.search}<input type="text" id="inv-search" placeholder="Buscar producto…" oninput="filterInventarioTable()" /></div>
          <select id="inv-cat" onchange="filterInventarioTable()" style="width:auto;min-width:140px">
            <option value="">Todas las categorías</option>
          </select>
          <label style="display:flex;align-items:center;gap:6px;font-size:13px;font-weight:500;text-transform:none;letter-spacing:0;color:var(--text-muted)">
            <input type="checkbox" id="inv-low-stock" onchange="filterInventarioTable()" /> Solo stock bajo
          </label>
        </div>
        <div class="table-wrapper">
          <table>
            <thead><tr>
              <th>Producto</th><th>Categoría</th><th>Stock</th>
              <th>Precio venta</th><th>Precio costo</th><th>Proveedor</th>
              ${isAdmin ? '<th>Acciones</th>' : ''}
            </tr></thead>
            <tbody id="inv-tbody"><tr><td colspan="7" class="table-empty">Cargando…</td></tr></tbody>
          </table>
        </div>
      </div>
    </div>
  `;

  const refrescarInventario = async () => {
    try {
      const snap = await db.collection('productos').get();
      window._invProductos = snap.docs
        .filter(d => d.data().activo !== false)
        .map(d => ({ id: d.id, ...d.data() }))
        .sort((a, b) => (a.nombre || '').localeCompare(b.nombre || ''));
      updateCatFilter(window._invProductos);
      renderInventarioTable(window._invProductos);
    } catch(err) {
      showToast('Error al cargar inventario: ' + err.message, 'error');
    }
  };

  await refrescarInventario();

  const unsub = db.collection('productos').onSnapshot(
    () => refrescarInventario(),
    err => console.warn('Inventario listener:', err)
  );
  App.unsubs.push(unsub);
}

function updateCatFilter(productos) {
  const cats = [...new Set(productos.map(p => p.categoria).filter(Boolean))].sort();
  const sel = $id('inv-cat');
  if (!sel) return;
  const cur = sel.value;
  sel.innerHTML = '<option value="">Todas las categorías</option>' + cats.map(c => `<option value="${c}" ${c===cur?'selected':''}>${c}</option>`).join('');
}

function filterInventarioTable() {
  if (!window._invProductos) return;
  const q = ($id('inv-search')?.value || '').toLowerCase();
  const cat = $id('inv-cat')?.value || '';
  const lowOnly = $id('inv-low-stock')?.checked;
  const filtered = window._invProductos.filter(p =>
    (!q || p.nombre?.toLowerCase().includes(q) || p.proveedor?.toLowerCase().includes(q)) &&
    (!cat || p.categoria === cat) &&
    (!lowOnly || p.stock <= (p.stock_minimo || 5))
  );
  renderInventarioTable(filtered);
}

function renderInventarioTable(productos) {
  const isAdmin = App.userData.rol === 'admin';
  const tbody = $id('inv-tbody');
  if (!tbody) return;
  if (!productos.length) {
    tbody.innerHTML = `<tr><td colspan="7" class="table-empty">${ico.inventario}<br>Sin productos</td></tr>`;
    return;
  }
  tbody.innerHTML = productos.map(p => {
    const lowStock = p.stock <= (p.stock_minimo || 5);
    return `<tr>
      <td><strong>${p.nombre}</strong></td>
      <td>${p.categoria || '—'}</td>
      <td>
        <span class="badge ${lowStock ? 'badge-danger' : 'badge-success'}">${p.stock}</span>
        ${lowStock ? `<span style="font-size:11px;color:var(--danger);margin-left:4px">${ico.warn}</span>` : ''}
      </td>
      <td>${fmtMoney(p.precio_venta)}</td>
      <td>${fmtMoney(p.precio_costo)}</td>
      <td>${p.proveedor || '—'}</td>
      ${isAdmin ? `<td style="white-space:nowrap">
        <button class="btn-icon" title="Ajustar stock" onclick="showAjusteStockModal('${p.id}','${esc(p.nombre)}',${p.stock})">${ico.inventario}</button>
        <button class="btn-icon" title="Editar" onclick="showEditProductoModal('${p.id}')">${ico.edit}</button>
        <button class="btn-icon danger" title="Eliminar" onclick="deleteProducto('${p.id}','${esc(p.nombre)}')">${ico.trash}</button>
      </td>` : ''}
    </tr>`;
  }).join('');
}

function showAddProductoModal() {
  openModal('Agregar producto', `
    <form id="producto-form">
      <div class="form-row">
        <div class="form-group"><label>Nombre *</label><input type="text" id="pf-nombre" required /></div>
        <div class="form-group"><label>Categoría</label><input type="text" id="pf-cat" list="cats-list" /><datalist id="cats-list"></datalist></div>
      </div>
      <div class="form-row">
        <div class="form-group"><label>Precio de venta *</label><div class="input-group"><span class="input-prefix">$</span><input type="number" id="pf-pventa" min="0" step="1" required /></div></div>
        <div class="form-group"><label>Precio de costo</label><div class="input-group"><span class="input-prefix">$</span><input type="number" id="pf-pcosto" min="0" step="1" /></div></div>
      </div>
      <div class="form-row">
        <div class="form-group"><label>Stock inicial *</label><input type="number" id="pf-stock" min="0" step="1" value="0" required /></div>
        <div class="form-group"><label>Stock mínimo</label><input type="number" id="pf-stockmin" min="0" step="1" value="5" /></div>
      </div>
      <div class="form-group"><label>Proveedor</label><input type="text" id="pf-prov" /></div>
      <div class="form-actions">
        <button type="button" class="btn btn-secondary" onclick="closeModal()">Cancelar</button>
        <button type="submit" class="btn btn-primary">Guardar producto</button>
      </div>
    </form>
  `);
  // Fill category datalist
  if (window._invProductos) {
    const cats = [...new Set(window._invProductos.map(p => p.categoria).filter(Boolean))];
    $id('cats-list').innerHTML = cats.map(c => `<option value="${c}">`).join('');
  }
  $id('producto-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const data = {
      nombre: $id('pf-nombre').value.trim(),
      categoria: $id('pf-cat').value.trim(),
      precio_venta: Number($id('pf-pventa').value),
      precio_costo: Number($id('pf-pcosto').value) || 0,
      stock: Number($id('pf-stock').value),
      stock_minimo: Number($id('pf-stockmin').value) || 5,
      proveedor: $id('pf-prov').value.trim(),
      activo: true,
      creado_en: firebase.firestore.FieldValue.serverTimestamp(),
      actualizado_en: firebase.firestore.FieldValue.serverTimestamp(),
    };
    try {
      await db.collection('productos').add(data);
      showToast('Producto agregado correctamente');
      closeModal();
    } catch(e) { showToast('Error al guardar: ' + e.message, 'error'); }
  });
}

async function showEditProductoModal(id) {
  const snap = await db.collection('productos').doc(id).get();
  if (!snap.exists) return;
  const p = snap.data();
  openModal('Editar producto', `
    <form id="producto-form">
      <div class="form-row">
        <div class="form-group"><label>Nombre *</label><input type="text" id="pf-nombre" value="${esc(p.nombre)}" required /></div>
        <div class="form-group"><label>Categoría</label><input type="text" id="pf-cat" value="${esc(p.categoria||'')}" list="cats-list" /><datalist id="cats-list"></datalist></div>
      </div>
      <div class="form-row">
        <div class="form-group"><label>Precio de venta *</label><div class="input-group"><span class="input-prefix">$</span><input type="number" id="pf-pventa" value="${p.precio_venta||0}" min="0" required /></div></div>
        <div class="form-group"><label>Precio de costo</label><div class="input-group"><span class="input-prefix">$</span><input type="number" id="pf-pcosto" value="${p.precio_costo||0}" min="0" /></div></div>
      </div>
      <div class="form-row">
        <div class="form-group"><label>Stock actual</label><input type="number" id="pf-stock" value="${p.stock||0}" min="0" /></div>
        <div class="form-group"><label>Stock mínimo</label><input type="number" id="pf-stockmin" value="${p.stock_minimo||5}" min="0" /></div>
      </div>
      <div class="form-group"><label>Proveedor</label><input type="text" id="pf-prov" value="${esc(p.proveedor||'')}" /></div>
      <div class="form-actions">
        <button type="button" class="btn btn-secondary" onclick="closeModal()">Cancelar</button>
        <button type="submit" class="btn btn-primary">Actualizar</button>
      </div>
    </form>
  `);
  if (window._invProductos) {
    const cats = [...new Set(window._invProductos.map(x => x.categoria).filter(Boolean))];
    $id('cats-list').innerHTML = cats.map(c => `<option value="${c}">`).join('');
  }
  $id('producto-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    try {
      await db.collection('productos').doc(id).update({
        nombre: $id('pf-nombre').value.trim(),
        categoria: $id('pf-cat').value.trim(),
        precio_venta: Number($id('pf-pventa').value),
        precio_costo: Number($id('pf-pcosto').value) || 0,
        stock: Number($id('pf-stock').value),
        stock_minimo: Number($id('pf-stockmin').value) || 5,
        proveedor: $id('pf-prov').value.trim(),
        actualizado_en: firebase.firestore.FieldValue.serverTimestamp(),
      });
      showToast('Producto actualizado');
      closeModal();
    } catch(e) { showToast('Error: ' + e.message, 'error'); }
  });
}

function showAjusteStockModal(id, nombre, stockActual) {
  openModal('Ajuste de stock', `
    <form id="ajuste-form">
      <p style="margin-bottom:16px;font-size:14px"><strong>${nombre}</strong> — Stock actual: <strong>${stockActual}</strong></p>
      <div class="form-group">
        <label>Tipo de ajuste</label>
        <select id="aj-tipo">
          <option value="entrada">Entrada (agregar stock)</option>
          <option value="salida">Salida (restar stock)</option>
          <option value="ajuste">Ajuste directo (fijar cantidad)</option>
        </select>
      </div>
      <div class="form-group">
        <label>Cantidad</label>
        <input type="number" id="aj-cantidad" min="1" value="1" required />
      </div>
      <div class="form-group">
        <label>Motivo</label>
        <input type="text" id="aj-motivo" placeholder="Ej: Compra a proveedor, merma…" />
      </div>
      <div class="form-actions">
        <button type="button" class="btn btn-secondary" onclick="closeModal()">Cancelar</button>
        <button type="submit" class="btn btn-primary">Aplicar ajuste</button>
      </div>
    </form>
  `, { sm: true });
  $id('ajuste-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const tipo = $id('aj-tipo').value;
    const qty = Number($id('aj-cantidad').value);
    let nuevoStock = stockActual;
    if (tipo === 'entrada') nuevoStock = stockActual + qty;
    else if (tipo === 'salida') nuevoStock = Math.max(0, stockActual - qty);
    else nuevoStock = qty;
    try {
      await db.collection('productos').doc(id).update({
        stock: nuevoStock,
        actualizado_en: firebase.firestore.FieldValue.serverTimestamp(),
      });
      showToast(`Stock actualizado a ${nuevoStock}`);
      closeModal();
    } catch(e) { showToast('Error: ' + e.message, 'error'); }
  });
}

async function deleteProducto(id, nombre) {
  openConfirm(`¿Eliminar el producto "${nombre}"? Esta acción no se puede deshacer.`, async () => {
    try {
      await db.collection('productos').doc(id).update({ activo: false });
      showToast('Producto eliminado');
    } catch(e) { showToast('Error: ' + e.message, 'error'); }
  });
}

// =============================================
// CLIENTES
// =============================================

async function loadClientes() {
  const isAdmin = App.userData.rol === 'admin';
  $id('view-container').innerHTML = `
    <div class="view">
      <div class="view-header">
        <div class="view-header-left"><h2>Clientes</h2><p>Registro y gestión de clientes</p></div>
        <button class="btn btn-primary" onclick="showAddClienteModal()">${ico.plus} Agregar cliente</button>
      </div>
      <div class="card">
        <div class="table-toolbar">
          <div class="search-box">${ico.search}<input type="text" id="cl-search" placeholder="Buscar cliente…" oninput="filterClientesTable()" /></div>
        </div>
        <div class="table-wrapper">
          <table>
            <thead><tr><th>Nombre</th><th>Teléfono</th><th>Correo</th><th>Dirección</th><th>Registro</th><th>Acciones</th></tr></thead>
            <tbody id="cl-tbody"><tr><td colspan="6" class="table-empty">Cargando…</td></tr></tbody>
          </table>
        </div>
      </div>
    </div>
  `;

  const refrescarClientes = async () => {
    try {
      const snap = await db.collection('clientes').get();
      window._clientes = snap.docs
        .filter(d => d.data().activo !== false)
        .map(d => ({ id: d.id, ...d.data() }))
        .sort((a, b) => (a.nombre || '').localeCompare(b.nombre || ''));
      renderClientesTable(window._clientes);
    } catch(err) {
      showToast('Error al cargar clientes: ' + err.message, 'error');
    }
  };

  await refrescarClientes();

  // Escucha cambios en tiempo real sin filtro where (evita problema de índices)
  const unsub = db.collection('clientes').onSnapshot(
    () => refrescarClientes(),
    err => console.warn('Clientes listener:', err)
  );
  App.unsubs.push(unsub);
}

function filterClientesTable() {
  if (!window._clientes) return;
  const q = ($id('cl-search')?.value || '').toLowerCase();
  renderClientesTable(window._clientes.filter(c =>
    !q || c.nombre?.toLowerCase().includes(q) || c.telefono?.includes(q) || c.email?.toLowerCase().includes(q)
  ));
}

function renderClientesTable(clientes) {
  const isAdmin = App.userData.rol === 'admin';
  const tbody = $id('cl-tbody');
  if (!tbody) return;
  if (!clientes.length) {
    tbody.innerHTML = `<tr><td colspan="6" class="table-empty">${ico.clientes}<br>Sin clientes registrados</td></tr>`;
    return;
  }
  tbody.innerHTML = clientes.map(c => `
    <tr>
      <td><strong>${c.nombre}</strong></td>
      <td>${c.telefono || '—'}</td>
      <td>${c.email || '—'}</td>
      <td>${c.direccion || '—'}</td>
      <td>${fmtDate(c.creado_en)}</td>
      <td style="white-space:nowrap;display:flex;gap:6px;align-items:center">
        <button class="btn btn-sm btn-secondary" onclick="showEditClienteModal('${c.id}')">${ico.edit} Editar</button>
        <button class="btn-icon" title="Ver créditos" onclick="navigate('creditos');setTimeout(()=>filtrarCreditosPorCliente('${c.id}'),800)">${ico.creditos}</button>
        ${isAdmin ? `<button class="btn-icon danger" title="Eliminar" onclick="deleteCliente('${c.id}','${esc(c.nombre)}')">${ico.trash}</button>` : ''}
      </td>
    </tr>
  `).join('');
}

function showAddClienteModal() {
  openModal('Agregar cliente', `
    <form id="cliente-form">
      <div class="form-group"><label>Nombre completo *</label><input type="text" id="cf-nombre" required /></div>
      <div class="form-row">
        <div class="form-group"><label>Teléfono</label><input type="tel" id="cf-tel" /></div>
        <div class="form-group"><label>Correo electrónico</label><input type="email" id="cf-email" /></div>
      </div>
      <div class="form-group"><label>Dirección</label><input type="text" id="cf-dir" /></div>
      <div class="form-group"><label>Notas</label><textarea id="cf-notas" rows="2"></textarea></div>
      <div class="form-actions">
        <button type="button" class="btn btn-secondary" onclick="closeModal()">Cancelar</button>
        <button type="submit" class="btn btn-primary">Guardar cliente</button>
      </div>
    </form>
  `);
  $id('cliente-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    try {
      await db.collection('clientes').add({
        nombre: $id('cf-nombre').value.trim(),
        telefono: $id('cf-tel').value.trim(),
        email: $id('cf-email').value.trim(),
        direccion: $id('cf-dir').value.trim(),
        notas: $id('cf-notas').value.trim(),
        activo: true,
        creado_en: firebase.firestore.FieldValue.serverTimestamp(),
      });
      showToast('Cliente agregado');
      closeModal();
    } catch(e) { showToast('Error: ' + e.message, 'error'); }
  });
}

async function showEditClienteModal(id) {
  const snap = await db.collection('clientes').doc(id).get();
  if (!snap.exists) return;
  const c = snap.data();
  openModal('Editar cliente', `
    <form id="cliente-form">
      <div class="form-group"><label>Nombre completo *</label><input type="text" id="cf-nombre" value="${esc(c.nombre)}" required /></div>
      <div class="form-row">
        <div class="form-group"><label>Teléfono</label><input type="tel" id="cf-tel" value="${esc(c.telefono||'')}" /></div>
        <div class="form-group"><label>Correo electrónico</label><input type="email" id="cf-email" value="${esc(c.email||'')}" /></div>
      </div>
      <div class="form-group"><label>Dirección</label><input type="text" id="cf-dir" value="${esc(c.direccion||'')}" /></div>
      <div class="form-group"><label>Notas</label><textarea id="cf-notas" rows="2">${esc(c.notas||'')}</textarea></div>
      <div class="form-actions">
        <button type="button" class="btn btn-secondary" onclick="closeModal()">Cancelar</button>
        <button type="submit" class="btn btn-primary">Actualizar</button>
      </div>
    </form>
  `);
  $id('cliente-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    try {
      await db.collection('clientes').doc(id).update({
        nombre: $id('cf-nombre').value.trim(),
        telefono: $id('cf-tel').value.trim(),
        email: $id('cf-email').value.trim(),
        direccion: $id('cf-dir').value.trim(),
        notas: $id('cf-notas').value.trim(),
      });
      showToast('Cliente actualizado');
      closeModal();
    } catch(e) { showToast('Error: ' + e.message, 'error'); }
  });
}

async function deleteCliente(id, nombre) {
  openConfirm(`¿Eliminar al cliente "${nombre}"?`, async () => {
    try {
      await db.collection('clientes').doc(id).update({ activo: false });
      showToast('Cliente eliminado');
    } catch(e) { showToast('Error: ' + e.message, 'error'); }
  });
}

// =============================================
// CRÉDITOS
// =============================================

async function loadCreditos() {
  $id('view-container').innerHTML = `
    <div class="view">
      <div class="view-header">
        <div class="view-header-left"><h2>Créditos</h2><p>Gestión de créditos y cobros</p></div>
        <button class="btn btn-primary" onclick="showAddCreditoModal()">${ico.plus} Nuevo crédito</button>
      </div>
      <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:16px;margin-bottom:20px">
        <div class="stat-card"><div class="stat-icon warning">${ico.creditos}</div><div class="stat-label">Créditos activos</div><div class="stat-value" id="cr-stat-activos">—</div></div>
        <div class="stat-card"><div class="stat-icon danger">${ico.creditos}</div><div class="stat-label">Total pendiente</div><div class="stat-value" id="cr-stat-pendiente" style="color:var(--danger)">—</div></div>
        <div class="stat-card"><div class="stat-icon navy">${ico.creditos}</div><div class="stat-label">Créditos vencidos</div><div class="stat-value" id="cr-stat-vencidos" style="color:var(--danger)">—</div></div>
      </div>
      <div class="card">
        <div class="table-toolbar filter-bar">
          <div class="search-box">${ico.search}<input type="text" id="cr-search" placeholder="Buscar cliente…" oninput="filterCreditosTable()" /></div>
          <select id="cr-estado" onchange="filterCreditosTable()" style="width:auto">
            <option value="">Todos</option>
            <option value="activo">Activos</option>
            <option value="pagado">Pagados</option>
            <option value="vencido">Vencidos</option>
          </select>
        </div>
        <div class="table-wrapper">
          <table>
            <thead><tr><th>Cliente</th><th>Monto original</th><th>Saldo pendiente</th><th>Vencimiento</th><th>Estado</th><th>Acciones</th></tr></thead>
            <tbody id="cr-tbody"><tr><td colspan="6" class="table-empty">Cargando…</td></tr></tbody>
          </table>
        </div>
      </div>
    </div>
  `;

  const refrescarCreditos = async () => {
    try {
      const snap = await db.collection('creditos').get();
      window._creditos = snap.docs
        .map(d => ({ id: d.id, ...d.data() }))
        .sort((a, b) => {
          const ta = a.creado_en?.toDate ? a.creado_en.toDate() : new Date(0);
          const tb = b.creado_en?.toDate ? b.creado_en.toDate() : new Date(0);
          return tb - ta;
        });
      await checkVencidos();
      updateCreditosStats(window._creditos);
      renderCreditosTable(window._creditos);
    } catch(err) {
      showToast('Error al cargar créditos: ' + err.message, 'error');
    }
  };

  await refrescarCreditos();

  const unsub = db.collection('creditos').onSnapshot(
    () => refrescarCreditos(),
    err => console.warn('Créditos listener:', err)
  );
  App.unsubs.push(unsub);
}

function updateCreditosStats(creditos) {
  const activos = creditos.filter(c => c.estado === 'activo');
  const vencidos = creditos.filter(c => c.estado === 'vencido');
  const totalPendiente = [...activos, ...vencidos].reduce((s, c) => s + (c.saldo_pendiente || 0), 0);
  const elActivos = $id('cr-stat-activos');
  const elPendiente = $id('cr-stat-pendiente');
  const elVencidos = $id('cr-stat-vencidos');
  if (elActivos) elActivos.textContent = activos.length;
  if (elPendiente) elPendiente.textContent = fmtMoney(totalPendiente);
  if (elVencidos) elVencidos.textContent = vencidos.length;
}

async function checkVencidos() {
  if (!window._creditos) return;
  const now = new Date();
  const batch = db.batch();
  let changed = false;
  window._creditos.forEach(c => {
    if (c.estado === 'activo' && c.fecha_vencimiento) {
      const fv = c.fecha_vencimiento.toDate ? c.fecha_vencimiento.toDate() : new Date(c.fecha_vencimiento);
      if (fv < now) {
        batch.update(db.collection('creditos').doc(c.id), { estado: 'vencido' });
        changed = true;
      }
    }
  });
  if (changed) await batch.commit();
}

function filtrarCreditosPorCliente(clienteId) {
  if (!window._creditos) return;
  const sel = $id('cr-estado');
  if (sel) sel.value = '';
  renderCreditosTable(window._creditos.filter(c => c.cliente_id === clienteId));
}

function filterCreditosTable() {
  if (!window._creditos) return;
  const q = ($id('cr-search')?.value || '').toLowerCase();
  const est = $id('cr-estado')?.value || '';
  renderCreditosTable(window._creditos.filter(c =>
    (!q || c.cliente_nombre?.toLowerCase().includes(q)) && (!est || c.estado === est)
  ));
}

function renderCreditosTable(creditos) {
  const isAdmin = App.userData.rol === 'admin';
  const tbody = $id('cr-tbody');
  if (!tbody) return;
  if (!creditos.length) {
    tbody.innerHTML = `<tr><td colspan="6" class="table-empty">${ico.creditos}<br>Sin créditos</td></tr>`;
    return;
  }
  const estadoBadge = { activo: 'badge-info', pagado: 'badge-success', vencido: 'badge-danger' };
  tbody.innerHTML = creditos.map(c => {
    const pct = c.monto_original > 0 ? Math.round(((c.monto_original - (c.saldo_pendiente||0)) / c.monto_original) * 100) : 100;
    return `<tr>
      <td><strong>${c.cliente_nombre || '—'}</strong></td>
      <td>${fmtMoney(c.monto_original)}</td>
      <td>
        <strong>${fmtMoney(c.saldo_pendiente)}</strong>
        <div class="credit-progress-bar"><div class="progress-fill" style="width:${pct}%"></div></div>
        <div style="font-size:11px;color:var(--text-muted)">${pct}% pagado</div>
      </td>
      <td>${fmtDate(c.fecha_vencimiento)}</td>
      <td><span class="badge ${estadoBadge[c.estado]||'badge-neutral'}">${c.estado}</span></td>
      <td style="white-space:nowrap;display:flex;gap:6px;align-items:center">
        ${c.estado !== 'pagado' ? `<button class="btn btn-sm btn-success" onclick="showRegistrarPagoModal('${c.id}','${esc(c.cliente_nombre||'')}',${c.saldo_pendiente||0})">${ico.pay} Registrar abono</button>` : '<span class="badge badge-success">Saldado</span>'}
        <button class="btn-icon" title="Ver historial de abonos" onclick="showHistorialPagosModal('${c.id}')">${ico.eye}</button>
        ${isAdmin ? `<button class="btn-icon danger" title="Eliminar" onclick="deleteCredito('${c.id}')">${ico.trash}</button>` : ''}
      </td>
    </tr>`;
  }).join('');
}

async function showAddCreditoModal() {
  const clientesSnap = await db.collection('clientes').where('activo', '==', true).get();
  const clientes = clientesSnap.docs.sort((a, b) => (a.data().nombre || '').localeCompare(b.data().nombre || ''));
  openModal('Nuevo crédito', `
    <form id="credito-form">
      <div class="form-group">
        <label>Cliente *</label>
        <select id="crf-cliente" required>
          <option value="">Selecciona un cliente…</option>
          ${clientes.map(d => `<option value="${d.id}" data-nombre="${esc(d.data().nombre)}">${d.data().nombre}</option>`).join('')}
        </select>
        <div class="form-hint">¿No está el cliente? <a href="#" onclick="navigate('clientes')" style="color:var(--blue)">Agrégalo primero</a></div>
      </div>
      <div class="form-row">
        <div class="form-group"><label>Monto del crédito *</label><div class="input-group"><span class="input-prefix">$</span><input type="number" id="crf-monto" min="1" required /></div></div>
        <div class="form-group"><label>Fecha de vencimiento *</label><input type="date" id="crf-vencimiento" required /></div>
      </div>
      <div class="form-group"><label>Observaciones</label><textarea id="crf-obs" rows="2"></textarea></div>
      <div class="form-actions">
        <button type="button" class="btn btn-secondary" onclick="closeModal()">Cancelar</button>
        <button type="submit" class="btn btn-primary">Crear crédito</button>
      </div>
    </form>
  `);
  $id('credito-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const selEl = $id('crf-cliente');
    const clienteId = selEl.value;
    const clienteNombre = selEl.options[selEl.selectedIndex]?.dataset.nombre || '';
    const monto = Number($id('crf-monto').value);
    const vencimiento = $id('crf-vencimiento').value;
    try {
      await db.collection('creditos').add({
        cliente_id: clienteId,
        cliente_nombre: clienteNombre,
        monto_original: monto,
        saldo_pendiente: monto,
        fecha_otorgamiento: firebase.firestore.FieldValue.serverTimestamp(),
        fecha_vencimiento: firebase.firestore.Timestamp.fromDate(dayEnd(vencimiento)),
        estado: 'activo',
        observaciones: $id('crf-obs').value.trim(),
        pagos: [],
        creado_por_uid: App.userData.uid,
        creado_por_nombre: App.userData.nombre,
        creado_en: firebase.firestore.FieldValue.serverTimestamp(),
      });
      showToast('Crédito creado');
      closeModal();
    } catch(e) { showToast('Error: ' + e.message, 'error'); }
  });
}

function showRegistrarPagoModal(creditoId, clienteNombre, saldoPendiente) {
  openModal(`Registrar pago — ${clienteNombre}`, `
    <form id="pago-form">
      <p style="margin-bottom:16px;font-size:14px">Saldo pendiente: <strong style="color:var(--danger)">${fmtMoney(saldoPendiente)}</strong></p>
      <div class="form-group"><label>Monto del pago *</label><div class="input-group"><span class="input-prefix">$</span><input type="number" id="pf-monto" min="1" max="${saldoPendiente}" value="${saldoPendiente}" required /></div></div>
      <div class="form-group"><label>Fecha del pago</label><input type="date" id="pf-fecha" value="${todayStr()}" required /></div>
      <div class="form-group"><label>Notas</label><input type="text" id="pf-notas" placeholder="Opcional…" /></div>
      <div class="form-actions">
        <button type="button" class="btn btn-secondary" onclick="closeModal()">Cancelar</button>
        <button type="submit" class="btn btn-success">${ico.pay} Registrar pago</button>
      </div>
    </form>
  `, { sm: true });
  $id('pago-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const montoPago = Number($id('pf-monto').value);
    const fechaPago = $id('pf-fecha').value;
    const nuevoSaldo = Math.max(0, saldoPendiente - montoPago);
    const nuevoEstado = nuevoSaldo === 0 ? 'pagado' : 'activo';
    try {
      await db.collection('creditos').doc(creditoId).update({
        saldo_pendiente: nuevoSaldo,
        estado: nuevoEstado,
        pagos: firebase.firestore.FieldValue.arrayUnion({
          monto: montoPago,
          fecha: firebase.firestore.Timestamp.fromDate(parseLocalDate(fechaPago)),
          notas: $id('pf-notas').value.trim(),
          registrado_por: App.userData.nombre,
        }),
      });
      // Register as income
      await db.collection('ingresos').add({
        concepto: `Pago crédito — ${clienteNombre}`,
        categoria: 'pago_credito',
        monto: montoPago,
        forma_pago: 'efectivo',
        cliente_nombre: clienteNombre,
        credito_id: creditoId,
        registrado_por_uid: App.userData.uid,
        registrado_por_nombre: App.userData.nombre,
        fecha: firebase.firestore.Timestamp.fromDate(parseLocalDate(fechaPago)),
      });
      showToast(nuevoEstado === 'pagado' ? '✅ Crédito saldado' : 'Pago registrado');
      closeModal();
    } catch(e) { showToast('Error: ' + e.message, 'error'); }
  });
}

async function showHistorialPagosModal(creditoId) {
  const snap = await db.collection('creditos').doc(creditoId).get();
  if (!snap.exists) return;
  const c = snap.data();
  const pagos = c.pagos || [];
  openModal(`Historial de pagos — ${c.cliente_nombre}`, `
    <p style="margin-bottom:16px">Monto original: <strong>${fmtMoney(c.monto_original)}</strong> · Saldo pendiente: <strong style="color:var(--danger)">${fmtMoney(c.saldo_pendiente)}</strong></p>
    <div class="pagos-list">
      ${pagos.length ? pagos.sort((a, b) => {
        const ta = a.fecha?.toDate ? a.fecha.toDate() : new Date(0);
        const tb = b.fecha?.toDate ? b.fecha.toDate() : new Date(0);
        return tb - ta;
      }).map(p => `
        <div class="pago-item">
          <div><strong>${fmtMoney(p.monto)}</strong>${p.notas ? ` — <span style="color:var(--text-muted)">${p.notas}</span>` : ''}</div>
          <div style="font-size:12px;color:var(--text-muted)">${fmtDate(p.fecha)} · ${p.registrado_por || ''}</div>
        </div>
      `).join('') : '<p class="text-muted text-center">Sin pagos registrados</p>'}
    </div>
    <div class="form-actions"><button class="btn btn-secondary" onclick="closeModal()">Cerrar</button></div>
  `);
}

async function deleteCredito(id) {
  openConfirm('¿Eliminar este crédito permanentemente?', async () => {
    try {
      await db.collection('creditos').doc(id).delete();
      showToast('Crédito eliminado');
    } catch(e) { showToast('Error: ' + e.message, 'error'); }
  });
}

// =============================================
// INGRESOS
// =============================================

async function loadIngresos() {
  const isAdmin = App.userData.rol === 'admin';
  $id('view-container').innerHTML = `
    <div class="view">
      <div class="view-header">
        <div class="view-header-left"><h2>Ingresos</h2><p>Registro de ventas y entradas de dinero</p></div>
        <button class="btn btn-primary" onclick="showAddIngresoModal()">${ico.plus} Registrar ingreso</button>
      </div>
      <div class="card">
        <div class="table-toolbar filter-bar">
          <div class="search-box">${ico.search}<input type="text" id="ing-search" placeholder="Buscar concepto…" oninput="filterIngresosTable()" /></div>
          <select id="ing-cat" onchange="filterIngresosTable()" style="width:auto;min-width:160px">
            <option value="">Todas las categorías</option>
            <option value="venta_producto">Venta de producto</option>
            <option value="pago_credito">Pago de crédito</option>
            <option value="otro">Otro</option>
          </select>
          <div class="date-range">
            <input type="date" id="ing-desde" value="${todayStr()}" onchange="filterIngresosTable()" />
            <span>—</span>
            <input type="date" id="ing-hasta" value="${todayStr()}" onchange="filterIngresosTable()" />
          </div>
        </div>
        <div style="padding:10px 20px;font-size:13px;border-bottom:1px solid var(--border);background:#f7fafc">
          Total en rango: <strong id="ing-total" style="color:var(--teal-dark)">—</strong>
        </div>
        <div class="table-wrapper">
          <table>
            <thead><tr><th>Fecha</th><th>Concepto</th><th>Categoría</th><th>Monto</th><th>Forma de pago</th><th>Registrado por</th>${isAdmin ? '<th></th>' : ''}</tr></thead>
            <tbody id="ing-tbody"><tr><td colspan="7" class="table-empty">Cargando…</td></tr></tbody>
          </table>
        </div>
      </div>
    </div>
  `;

  const refrescarIngresos = async () => {
    try {
      const snap = await db.collection('ingresos').get();
      window._ingresos = snap.docs
        .map(d => ({ id: d.id, ...d.data() }))
        .sort((a, b) => {
          const ta = a.fecha?.toDate ? a.fecha.toDate() : new Date(0);
          const tb = b.fecha?.toDate ? b.fecha.toDate() : new Date(0);
          return tb - ta;
        });
      filterIngresosTable();
    } catch(err) {
      showToast('Error al cargar ingresos: ' + err.message, 'error');
    }
  };
  await refrescarIngresos();
  const unsub = db.collection('ingresos').onSnapshot(
    () => refrescarIngresos(),
    err => console.warn('Ingresos listener:', err)
  );
  App.unsubs.push(unsub);
}

function filterIngresosTable() {
  if (!window._ingresos) return;
  const q = ($id('ing-search')?.value || '').toLowerCase();
  const cat = $id('ing-cat')?.value || '';
  const desdeStr = $id('ing-desde')?.value;
  const hastaStr = $id('ing-hasta')?.value;
  const desde = desdeStr ? dayStart(desdeStr) : null;
  const hasta = hastaStr ? dayEnd(hastaStr) : null;

  const filtered = window._ingresos.filter(i => {
    const fecha = i.fecha?.toDate ? i.fecha.toDate() : null;
    return (!q || i.concepto?.toLowerCase().includes(q) || i.cliente_nombre?.toLowerCase().includes(q)) &&
      (!cat || i.categoria === cat) &&
      (!desde || !fecha || fecha >= desde) &&
      (!hasta || !fecha || fecha <= hasta);
  });

  const total = filtered.reduce((s, i) => s + (i.monto || 0), 0);
  const totalEl = $id('ing-total');
  if (totalEl) totalEl.textContent = fmtMoney(total);
  renderIngresosTable(filtered);
}

const catIngLabel = { venta_producto: 'Venta', pago_credito: 'Pago crédito', otro: 'Otro' };
const pagoLabel = { efectivo: 'Efectivo', tarjeta: 'Tarjeta', transferencia: 'Transferencia', otro: 'Otro' };

function renderIngresosTable(ingresos) {
  const isAdmin = App.userData.rol === 'admin';
  const tbody = $id('ing-tbody');
  if (!tbody) return;
  if (!ingresos.length) {
    tbody.innerHTML = `<tr><td colspan="7" class="table-empty">${ico.ingresos}<br>Sin ingresos en este período</td></tr>`;
    return;
  }
  tbody.innerHTML = ingresos.map(i => `
    <tr>
      <td style="white-space:nowrap">${fmtDatetime(i.fecha)}</td>
      <td>
        <strong>${i.concepto || '—'}</strong>
        ${i.cliente_nombre ? `<br><span style="font-size:12px;color:var(--text-muted)">${i.cliente_nombre}</span>` : ''}
        ${i.producto_nombre ? `<br><span style="font-size:12px;color:var(--text-muted)">${i.producto_nombre}${i.cantidad ? ` ×${i.cantidad}` : ''}</span>` : ''}
      </td>
      <td><span class="badge badge-info">${catIngLabel[i.categoria] || i.categoria || '—'}</span></td>
      <td class="fw-700 amount-income">${fmtMoney(i.monto)}</td>
      <td>${pagoLabel[i.forma_pago] || i.forma_pago || '—'}</td>
      <td style="font-size:12px;color:var(--text-muted)">${i.registrado_por_nombre || '—'}</td>
      ${isAdmin ? `<td><button class="btn-icon danger" onclick="deleteIngreso('${i.id}')">${ico.trash}</button></td>` : ''}
    </tr>
  `).join('');
}

async function showAddIngresoModal() {
  const prodsSnap = await db.collection('productos').where('activo', '==', true).get();
  const prods = prodsSnap.docs.sort((a, b) => (a.data().nombre || '').localeCompare(b.data().nombre || ''));
  const clientesSnap2 = await db.collection('clientes').where('activo', '==', true).get();
  const clientes2 = clientesSnap2.docs.sort((a, b) => (a.data().nombre || '').localeCompare(b.data().nombre || ''));
  openModal('Registrar ingreso', `
    <form id="ingreso-form">
      <div class="form-row">
        <div class="form-group">
          <label>Categoría *</label>
          <select id="if-cat" onchange="toggleIngresoCat()" required>
            <option value="venta_producto">Venta de producto</option>
            <option value="otro">Otro ingreso</option>
          </select>
        </div>
        <div class="form-group"><label>Fecha *</label><input type="date" id="if-fecha" value="${todayStr()}" required /></div>
      </div>
      <div id="if-venta-fields">
        <div class="form-group">
          <label>Producto *</label>
          <select id="if-producto" onchange="autoFillPrecio()">
            <option value="">Selecciona producto…</option>
            ${prods.map(d => `<option value="${d.id}" data-precio="${d.data().precio_venta}" data-nombre="${esc(d.data().nombre)}" data-stock="${d.data().stock}">${d.data().nombre} (stock: ${d.data().stock})</option>`).join('')}
          </select>
        </div>
        <div class="form-row">
          <div class="form-group"><label>Cantidad *</label><input type="number" id="if-cantidad" min="1" value="1" oninput="calcTotal()" /></div>
          <div class="form-group"><label>Precio unitario *</label><div class="input-group"><span class="input-prefix">$</span><input type="number" id="if-precio" min="0" oninput="calcTotal()" /></div></div>
        </div>
        <div style="padding:10px 14px;background:var(--bg);border-radius:6px;margin-bottom:12px;font-size:14px">
          Total: <strong id="if-total" style="color:var(--blue)">$0</strong>
        </div>
        <div class="form-group">
          <label>Cliente (opcional)</label>
          <select id="if-cliente-venta">
            <option value="">Sin cliente específico</option>
            ${clientes2.map(d => `<option value="${d.id}" data-nombre="${esc(d.data().nombre)}">${d.data().nombre}</option>`).join('')}
          </select>
        </div>
        <div class="form-group">
          <label><input type="checkbox" id="if-descontar-stock" checked /> Descontar del inventario</label>
        </div>
      </div>
      <div id="if-otro-fields" class="hidden">
        <div class="form-group"><label>Concepto *</label><input type="text" id="if-concepto" /></div>
        <div class="form-group"><label>Monto *</label><div class="input-group"><span class="input-prefix">$</span><input type="number" id="if-monto-otro" min="0" /></div></div>
      </div>
      <div class="form-group">
        <label>Forma de pago *</label>
        <select id="if-fpago" required>
          <option value="efectivo">Efectivo</option>
          <option value="tarjeta">Tarjeta</option>
          <option value="transferencia">Transferencia</option>
          <option value="otro">Otro</option>
        </select>
      </div>
      <div class="form-actions">
        <button type="button" class="btn btn-secondary" onclick="closeModal()">Cancelar</button>
        <button type="submit" class="btn btn-success">${ico.plus} Registrar</button>
      </div>
    </form>
  `, { lg: true });

  $id('ingreso-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const cat = $id('if-cat').value;
    const fecha = firebase.firestore.Timestamp.fromDate(parseLocalDate($id('if-fecha').value));
    try {
      if (cat === 'venta_producto') {
        const prodEl = $id('if-producto');
        const prodId = prodEl.value;
        const prodNombre = prodEl.options[prodEl.selectedIndex]?.dataset.nombre || '';
        const prodStock = Number(prodEl.options[prodEl.selectedIndex]?.dataset.stock || 0);
        const qty = Number($id('if-cantidad').value);
        const precio = Number($id('if-precio').value);
        const monto = qty * precio;
        const clienteEl = $id('if-cliente-venta');
        const clienteId = clienteEl.value;
        const clienteNombre = clienteEl.options[clienteEl.selectedIndex]?.dataset.nombre || '';

        if (!prodId) { showToast('Selecciona un producto', 'error'); return; }
        if (!precio) { showToast('Ingresa el precio', 'error'); return; }

        await db.collection('ingresos').add({
          concepto: `Venta: ${prodNombre}`,
          categoria: 'venta_producto',
          monto,
          forma_pago: $id('if-fpago').value,
          cliente_id: clienteId || null,
          cliente_nombre: clienteNombre || null,
          producto_id: prodId,
          producto_nombre: prodNombre,
          cantidad: qty,
          precio_unitario: precio,
          registrado_por_uid: App.userData.uid,
          registrado_por_nombre: App.userData.nombre,
          fecha,
        });

        if ($id('if-descontar-stock').checked && prodId) {
          const nuevoStock = Math.max(0, prodStock - qty);
          await db.collection('productos').doc(prodId).update({
            stock: nuevoStock,
            actualizado_en: firebase.firestore.FieldValue.serverTimestamp(),
          });
        }
      } else {
        const concepto = $id('if-concepto').value.trim();
        const monto = Number($id('if-monto-otro').value);
        if (!concepto || !monto) { showToast('Completa todos los campos', 'error'); return; }
        await db.collection('ingresos').add({
          concepto,
          categoria: 'otro',
          monto,
          forma_pago: $id('if-fpago').value,
          registrado_por_uid: App.userData.uid,
          registrado_por_nombre: App.userData.nombre,
          fecha,
        });
      }
      showToast('Ingreso registrado');
      closeModal();
    } catch(err) { showToast('Error: ' + err.message, 'error'); }
  });
}

function toggleIngresoCat() {
  const cat = $id('if-cat')?.value;
  $id('if-venta-fields')?.classList.toggle('hidden', cat !== 'venta_producto');
  $id('if-otro-fields')?.classList.toggle('hidden', cat === 'venta_producto');
}

function autoFillPrecio() {
  const el = $id('if-producto');
  if (!el) return;
  const opt = el.options[el.selectedIndex];
  if (opt?.dataset.precio) $id('if-precio').value = opt.dataset.precio;
  calcTotal();
}

function calcTotal() {
  const qty = Number($id('if-cantidad')?.value || 0);
  const precio = Number($id('if-precio')?.value || 0);
  const totalEl = $id('if-total');
  if (totalEl) totalEl.textContent = fmtMoney(qty * precio);
}

async function deleteIngreso(id) {
  openConfirm('¿Eliminar este registro de ingreso?', async () => {
    try {
      await db.collection('ingresos').doc(id).delete();
      showToast('Ingreso eliminado');
    } catch(e) { showToast('Error: ' + e.message, 'error'); }
  });
}

// =============================================
// EGRESOS (Admin only)
// =============================================

async function loadEgresos() {
  $id('view-container').innerHTML = `
    <div class="view">
      <div class="view-header">
        <div class="view-header-left"><h2>Egresos</h2><p>Control de gastos y salidas de dinero</p></div>
        <button class="btn btn-primary" onclick="showAddEgresoModal()">${ico.plus} Registrar egreso</button>
      </div>
      <div class="card">
        <div class="table-toolbar filter-bar">
          <div class="search-box">${ico.search}<input type="text" id="eg-search" placeholder="Buscar…" oninput="filterEgresosTable()" /></div>
          <select id="eg-cat" onchange="filterEgresosTable()" style="width:auto;min-width:160px">
            <option value="">Todas las categorías</option>
            <option value="Proveedores">Proveedores</option>
            <option value="Servicios">Servicios</option>
            <option value="Personal">Personal</option>
            <option value="Mantenimiento">Mantenimiento</option>
            <option value="Otros">Otros</option>
          </select>
          <div class="date-range">
            <input type="date" id="eg-desde" value="${todayStr()}" onchange="filterEgresosTable()" />
            <span>—</span>
            <input type="date" id="eg-hasta" value="${todayStr()}" onchange="filterEgresosTable()" />
          </div>
        </div>
        <div style="padding:10px 20px;font-size:13px;border-bottom:1px solid var(--border);background:#f7fafc">
          Total en rango: <strong id="eg-total" style="color:var(--danger)">—</strong>
        </div>
        <div class="table-wrapper">
          <table>
            <thead><tr><th>Fecha</th><th>Concepto</th><th>Categoría</th><th>Monto</th><th>Forma de pago</th><th>Proveedor</th><th></th></tr></thead>
            <tbody id="eg-tbody"><tr><td colspan="7" class="table-empty">Cargando…</td></tr></tbody>
          </table>
        </div>
      </div>
    </div>
  `;

  const refrescarEgresos = async () => {
    try {
      const snap = await db.collection('egresos').get();
      window._egresos = snap.docs
        .map(d => ({ id: d.id, ...d.data() }))
        .sort((a, b) => {
          const ta = a.fecha?.toDate ? a.fecha.toDate() : new Date(0);
          const tb = b.fecha?.toDate ? b.fecha.toDate() : new Date(0);
          return tb - ta;
        });
      filterEgresosTable();
    } catch(err) {
      showToast('Error al cargar egresos: ' + err.message, 'error');
    }
  };
  await refrescarEgresos();
  const unsub = db.collection('egresos').onSnapshot(
    () => refrescarEgresos(),
    err => console.warn('Egresos listener:', err)
  );
  App.unsubs.push(unsub);
}

function filterEgresosTable() {
  if (!window._egresos) return;
  const q = ($id('eg-search')?.value || '').toLowerCase();
  const cat = $id('eg-cat')?.value || '';
  const desdeStr = $id('eg-desde')?.value;
  const hastaStr = $id('eg-hasta')?.value;
  const desde = desdeStr ? dayStart(desdeStr) : null;
  const hasta = hastaStr ? dayEnd(hastaStr) : null;

  const filtered = window._egresos.filter(e => {
    const fecha = e.fecha?.toDate ? e.fecha.toDate() : null;
    return (!q || e.concepto?.toLowerCase().includes(q) || e.proveedor?.toLowerCase().includes(q)) &&
      (!cat || e.categoria === cat) &&
      (!desde || !fecha || fecha >= desde) &&
      (!hasta || !fecha || fecha <= hasta);
  });

  const total = filtered.reduce((s, e) => s + (e.monto || 0), 0);
  const totalEl = $id('eg-total');
  if (totalEl) totalEl.textContent = fmtMoney(total);
  renderEgresosTable(filtered);
}

function renderEgresosTable(egresos) {
  const tbody = $id('eg-tbody');
  if (!tbody) return;
  if (!egresos.length) {
    tbody.innerHTML = `<tr><td colspan="7" class="table-empty">${ico.egresos}<br>Sin egresos en este período</td></tr>`;
    return;
  }
  tbody.innerHTML = egresos.map(e => `
    <tr>
      <td style="white-space:nowrap">${fmtDatetime(e.fecha)}</td>
      <td><strong>${e.concepto || '—'}</strong>${e.observaciones ? `<br><span style="font-size:12px;color:var(--text-muted)">${e.observaciones}</span>` : ''}</td>
      <td><span class="badge badge-warning">${e.categoria || '—'}</span></td>
      <td class="fw-700 amount-expense">${fmtMoney(e.monto)}</td>
      <td>${pagoLabel[e.forma_pago] || e.forma_pago || '—'}</td>
      <td>${e.proveedor || '—'}</td>
      <td><button class="btn-icon danger" onclick="deleteEgreso('${e.id}')">${ico.trash}</button></td>
    </tr>
  `).join('');
}

function showAddEgresoModal() {
  openModal('Registrar egreso', `
    <form id="egreso-form">
      <div class="form-row">
        <div class="form-group"><label>Concepto *</label><input type="text" id="ef-concepto" required placeholder="Ej: Compra mercadería" /></div>
        <div class="form-group">
          <label>Categoría *</label>
          <select id="ef-cat" required>
            <option value="Proveedores">Proveedores</option>
            <option value="Servicios">Servicios</option>
            <option value="Personal">Personal</option>
            <option value="Mantenimiento">Mantenimiento</option>
            <option value="Otros">Otros</option>
          </select>
        </div>
      </div>
      <div class="form-row">
        <div class="form-group"><label>Monto *</label><div class="input-group"><span class="input-prefix">$</span><input type="number" id="ef-monto" min="0" required /></div></div>
        <div class="form-group"><label>Fecha *</label><input type="date" id="ef-fecha" value="${todayStr()}" required /></div>
      </div>
      <div class="form-row">
        <div class="form-group">
          <label>Forma de pago</label>
          <select id="ef-fpago">
            <option value="efectivo">Efectivo</option>
            <option value="tarjeta">Tarjeta</option>
            <option value="transferencia">Transferencia</option>
            <option value="otro">Otro</option>
          </select>
        </div>
        <div class="form-group"><label>Proveedor</label><input type="text" id="ef-prov" /></div>
      </div>
      <div class="form-group"><label>Observaciones</label><textarea id="ef-obs" rows="2"></textarea></div>
      <div class="form-actions">
        <button type="button" class="btn btn-secondary" onclick="closeModal()">Cancelar</button>
        <button type="submit" class="btn btn-danger">${ico.plus} Registrar egreso</button>
      </div>
    </form>
  `);
  $id('egreso-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    try {
      await db.collection('egresos').add({
        concepto: $id('ef-concepto').value.trim(),
        categoria: $id('ef-cat').value,
        monto: Number($id('ef-monto').value),
        forma_pago: $id('ef-fpago').value,
        proveedor: $id('ef-prov').value.trim(),
        observaciones: $id('ef-obs').value.trim(),
        registrado_por_uid: App.userData.uid,
        registrado_por_nombre: App.userData.nombre,
        fecha: firebase.firestore.Timestamp.fromDate(parseLocalDate($id('ef-fecha').value)),
      });
      showToast('Egreso registrado');
      closeModal();
    } catch(err) { showToast('Error: ' + err.message, 'error'); }
  });
}

async function deleteEgreso(id) {
  openConfirm('¿Eliminar este registro de egreso?', async () => {
    try {
      await db.collection('egresos').doc(id).delete();
      showToast('Egreso eliminado');
    } catch(e) { showToast('Error: ' + e.message, 'error'); }
  });
}

// =============================================
// LIQUIDACIÓN (Admin only)
// =============================================

function loadLiquidacion() {
  const firstDay = new Date();
  firstDay.setDate(1);
  const fromStr = firstDay.toISOString().slice(0, 10);
  const toStr = todayStr();

  $id('view-container').innerHTML = `
    <div class="view">
      <div class="view-header">
        <div class="view-header-left"><h2>Liquidación</h2><p>Informes por rango de fechas</p></div>
        <button class="btn btn-secondary" onclick="window.print()">${ico.liquidacion} Imprimir</button>
      </div>
      <div class="card" style="margin-bottom:20px">
        <div class="card-body">
          <div style="display:flex;gap:16px;align-items:flex-end;flex-wrap:wrap">
            <div class="form-group" style="margin:0">
              <label>Desde</label><input type="date" id="liq-desde" value="${fromStr}" />
            </div>
            <div class="form-group" style="margin:0">
              <label>Hasta</label><input type="date" id="liq-hasta" value="${toStr}" />
            </div>
            <button class="btn btn-primary" onclick="generarLiquidacion()">Generar reporte</button>
          </div>
        </div>
      </div>
      <div id="liq-resultado"></div>
    </div>
  `;
  generarLiquidacion();
}

async function generarLiquidacion() {
  const desdeStr = $id('liq-desde')?.value || todayStr();
  const hastaStr = $id('liq-hasta')?.value || todayStr();
  const desde = dayStart(desdeStr);
  const hasta = dayEnd(hastaStr);
  const res = $id('liq-resultado');
  if (!res) return;
  res.innerHTML = '<p class="text-muted text-center" style="padding:40px">Generando reporte…</p>';

  try {
    const [ingSnap, egrSnap, credSnap] = await Promise.all([
      db.collection('ingresos').where('fecha', '>=', desde).where('fecha', '<=', hasta).orderBy('fecha', 'desc').get(),
      db.collection('egresos').where('fecha', '>=', desde).where('fecha', '<=', hasta).orderBy('fecha', 'desc').get(),
      db.collection('creditos').where('estado', '==', 'activo').get(),
    ]);

    const ingresos = ingSnap.docs.map(d => ({ id: d.id, ...d.data() }));
    const egresos = egrSnap.docs.map(d => ({ id: d.id, ...d.data() }));
    const creditos = credSnap.docs.map(d => d.data());

    const totalIng = ingresos.reduce((s, i) => s + (i.monto || 0), 0);
    const totalEgr = egresos.reduce((s, e) => s + (e.monto || 0), 0);
    const balance = totalIng - totalEgr;
    const totalCredPendiente = creditos.reduce((s, c) => s + (c.saldo_pendiente || 0), 0);

    // Group by category
    const ingPorCat = {};
    ingresos.forEach(i => { ingPorCat[i.categoria || 'otro'] = (ingPorCat[i.categoria || 'otro'] || 0) + (i.monto || 0); });
    const egrPorCat = {};
    egresos.forEach(e => { egrPorCat[e.categoria || 'Otros'] = (egrPorCat[e.categoria || 'Otros'] || 0) + (e.monto || 0); });

    res.innerHTML = `
      <div class="report-summary">
        <div class="report-card income">
          <div class="rc-label">Total ingresos</div>
          <div class="rc-value">${fmtMoney(totalIng)}</div>
          <div style="font-size:12px;color:var(--text-muted);margin-top:4px">${ingresos.length} registros</div>
        </div>
        <div class="report-card expense">
          <div class="rc-label">Total egresos</div>
          <div class="rc-value">${fmtMoney(totalEgr)}</div>
          <div style="font-size:12px;color:var(--text-muted);margin-top:4px">${egresos.length} registros</div>
        </div>
        <div class="report-card balance">
          <div class="rc-label">Balance neto</div>
          <div class="rc-value" style="color:${balance >= 0 ? 'var(--teal-dark)' : 'var(--danger)'}">${fmtMoney(balance)}</div>
          <div style="font-size:12px;color:var(--text-muted);margin-top:4px">${balance >= 0 ? 'Positivo' : 'Negativo'}</div>
        </div>
      </div>

      <div class="two-cols" style="margin-bottom:20px">
        <div class="card">
          <div class="card-header"><h3>Ingresos por categoría</h3></div>
          <div class="card-body" style="padding:12px 20px">
            ${Object.entries(ingPorCat).length ? Object.entries(ingPorCat).sort((a,b)=>b[1]-a[1]).map(([cat, monto]) => `
              <div style="display:flex;justify-content:space-between;padding:8px 0;border-bottom:1px solid var(--border)">
                <span>${catIngLabel[cat] || cat}</span>
                <strong class="amount-income">${fmtMoney(monto)}</strong>
              </div>
            `).join('') : '<p class="text-muted text-center" style="padding:20px">Sin ingresos</p>'}
          </div>
        </div>
        <div class="card">
          <div class="card-header"><h3>Egresos por categoría</h3></div>
          <div class="card-body" style="padding:12px 20px">
            ${Object.entries(egrPorCat).length ? Object.entries(egrPorCat).sort((a,b)=>b[1]-a[1]).map(([cat, monto]) => `
              <div style="display:flex;justify-content:space-between;padding:8px 0;border-bottom:1px solid var(--border)">
                <span>${cat}</span>
                <strong class="amount-expense">${fmtMoney(monto)}</strong>
              </div>
            `).join('') : '<p class="text-muted text-center" style="padding:20px">Sin egresos</p>'}
          </div>
        </div>
      </div>

      <div class="card" style="margin-bottom:20px">
        <div class="card-header">
          <h3>Créditos activos pendientes</h3>
          <strong style="color:var(--danger)">${fmtMoney(totalCredPendiente)}</strong>
        </div>
        <div class="table-wrapper">
          <table>
            <thead><tr><th>Cliente</th><th>Saldo pendiente</th><th>Vencimiento</th><th>Estado</th></tr></thead>
            <tbody>
              ${creditos.length ? creditos.sort((a,b)=>(b.saldo_pendiente||0)-(a.saldo_pendiente||0)).map(c => `
                <tr>
                  <td><strong>${c.cliente_nombre || '—'}</strong></td>
                  <td class="fw-700 amount-expense">${fmtMoney(c.saldo_pendiente)}</td>
                  <td>${fmtDate(c.fecha_vencimiento)}</td>
                  <td><span class="badge badge-${c.estado === 'vencido' ? 'danger' : 'info'}">${c.estado}</span></td>
                </tr>
              `).join('') : '<tr><td colspan="4" class="table-empty">Sin créditos activos</td></tr>'}
            </tbody>
          </table>
        </div>
      </div>

      <div class="card">
        <div class="card-header"><h3>Detalle de movimientos</h3></div>
        <div class="table-wrapper">
          <table>
            <thead><tr><th>Fecha</th><th>Tipo</th><th>Concepto</th><th>Monto</th></tr></thead>
            <tbody>
              ${[
                ...ingresos.map(i => ({ ...i, _tipo: 'ingreso', _fecha: i.fecha?.toDate ? i.fecha.toDate() : new Date(0) })),
                ...egresos.map(e => ({ ...e, _tipo: 'egreso', _fecha: e.fecha?.toDate ? e.fecha.toDate() : new Date(0) })),
              ].sort((a, b) => b._fecha - a._fecha).map(m => `
                <tr>
                  <td>${fmtDate(m.fecha)}</td>
                  <td><span class="badge ${m._tipo === 'ingreso' ? 'badge-success' : 'badge-danger'}">${m._tipo === 'ingreso' ? 'Ingreso' : 'Egreso'}</span></td>
                  <td>${m.concepto || '—'}</td>
                  <td class="fw-700 ${m._tipo === 'ingreso' ? 'amount-income' : 'amount-expense'}">${m._tipo === 'ingreso' ? '+' : '-'}${fmtMoney(m.monto)}</td>
                </tr>
              `).join('')}
              ${ingresos.length + egresos.length === 0 ? '<tr><td colspan="4" class="table-empty">Sin movimientos en este período</td></tr>' : ''}
            </tbody>
          </table>
        </div>
      </div>
    `;
  } catch(e) {
    res.innerHTML = `<div class="error-msg">Error al generar reporte: ${e.message}</div>`;
  }
}

// =============================================
// NUEVA VENTA (cajero)
// =============================================

async function loadNuevaVenta() {
  $id('view-container').innerHTML = `
    <div class="view">
      <div class="view-header">
        <div class="view-header-left"><h2>Registrar venta</h2><p>Panel rápido del cajero</p></div>
      </div>
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:20px">
        <div class="card">
          <div class="card-header"><h3>${ico.ingresos} Registrar venta</h3></div>
          <div class="card-body" id="venta-rapida">Cargando productos…</div>
        </div>
        <div class="card">
          <div class="card-header"><h3>${ico.creditos} Crédito a cliente</h3></div>
          <div class="card-body" id="credito-rapido">Cargando clientes…</div>
        </div>
      </div>
    </div>
  `;

  const [prodsRaw, clientesRaw] = await Promise.all([
    db.collection('productos').where('activo', '==', true).get(),
    db.collection('clientes').where('activo', '==', true).get(),
  ]);
  const prods = { docs: prodsRaw.docs.sort((a, b) => (a.data().nombre || '').localeCompare(b.data().nombre || '')) };
  const clientes = { docs: clientesRaw.docs.sort((a, b) => (a.data().nombre || '').localeCompare(b.data().nombre || '')) };

  $id('venta-rapida').innerHTML = `
    <form id="vr-form">
      <div class="form-group">
        <label>Producto *</label>
        <select id="vr-prod" onchange="vrAutoFill()" required>
          <option value="">Selecciona…</option>
          ${prods.docs.map(d => `<option value="${d.id}" data-precio="${d.data().precio_venta}" data-nombre="${esc(d.data().nombre)}" data-stock="${d.data().stock}">${d.data().nombre} — stock: ${d.data().stock}</option>`).join('')}
        </select>
      </div>
      <div class="form-row">
        <div class="form-group"><label>Cantidad</label><input type="number" id="vr-qty" min="1" value="1" oninput="vrCalc()" /></div>
        <div class="form-group"><label>Precio</label><div class="input-group"><span class="input-prefix">$</span><input type="number" id="vr-precio" min="0" oninput="vrCalc()" /></div></div>
      </div>
      <div style="background:var(--bg);border-radius:6px;padding:12px 14px;margin-bottom:12px;font-size:15px">
        Total: <strong id="vr-total" style="color:var(--blue)">$0</strong>
      </div>
      <div class="form-group">
        <label>Forma de pago</label>
        <select id="vr-fpago">
          <option value="efectivo">Efectivo</option>
          <option value="tarjeta">Tarjeta</option>
          <option value="transferencia">Transferencia</option>
        </select>
      </div>
      <button type="submit" class="btn btn-success btn-full">${ico.plus} Registrar venta</button>
    </form>
  `;

  $id('credito-rapido').innerHTML = `
    <form id="cr-form">
      <div class="form-group">
        <label>Cliente *</label>
        <select id="cr-cliente" required>
          <option value="">Selecciona…</option>
          ${clientes.docs.map(d => `<option value="${d.id}" data-nombre="${esc(d.data().nombre)}">${d.data().nombre}</option>`).join('')}
        </select>
        <div class="form-hint"><a href="#" onclick="navigate('clientes')" style="color:var(--blue)">+ Agregar nuevo cliente</a></div>
      </div>
      <div class="form-row">
        <div class="form-group"><label>Monto *</label><div class="input-group"><span class="input-prefix">$</span><input type="number" id="cr-monto" min="1" required /></div></div>
        <div class="form-group"><label>Vencimiento *</label><input type="date" id="cr-vence" required /></div>
      </div>
      <div class="form-group"><label>Observaciones</label><textarea id="cr-obs" rows="2"></textarea></div>
      <button type="submit" class="btn btn-primary btn-full">${ico.creditos} Crear crédito</button>
    </form>
  `;

  $id('vr-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const prodEl = $id('vr-prod');
    const prodId = prodEl.value;
    const prodNombre = prodEl.options[prodEl.selectedIndex]?.dataset.nombre || '';
    const prodStock = Number(prodEl.options[prodEl.selectedIndex]?.dataset.stock || 0);
    const qty = Number($id('vr-qty').value);
    const precio = Number($id('vr-precio').value);
    if (!prodId || !precio) { showToast('Completa todos los campos', 'error'); return; }
    try {
      await db.collection('ingresos').add({
        concepto: `Venta: ${prodNombre}`,
        categoria: 'venta_producto',
        monto: qty * precio,
        forma_pago: $id('vr-fpago').value,
        producto_id: prodId, producto_nombre: prodNombre,
        cantidad: qty, precio_unitario: precio,
        registrado_por_uid: App.userData.uid,
        registrado_por_nombre: App.userData.nombre,
        fecha: firebase.firestore.Timestamp.fromDate(new Date()),
      });
      await db.collection('productos').doc(prodId).update({
        stock: Math.max(0, prodStock - qty),
        actualizado_en: firebase.firestore.FieldValue.serverTimestamp(),
      });
      showToast(`Venta registrada: ${fmtMoney(qty * precio)}`);
      $id('vr-form').reset();
      $id('vr-total').textContent = '$0';
    } catch(err) { showToast('Error: ' + err.message, 'error'); }
  });

  $id('cr-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const selEl = $id('cr-cliente');
    const clienteId = selEl.value;
    const clienteNombre = selEl.options[selEl.selectedIndex]?.dataset.nombre || '';
    const monto = Number($id('cr-monto').value);
    const vence = $id('cr-vence').value;
    if (!clienteId || !monto || !vence) { showToast('Completa todos los campos', 'error'); return; }
    try {
      await db.collection('creditos').add({
        cliente_id: clienteId, cliente_nombre: clienteNombre,
        monto_original: monto, saldo_pendiente: monto,
        fecha_otorgamiento: firebase.firestore.FieldValue.serverTimestamp(),
        fecha_vencimiento: firebase.firestore.Timestamp.fromDate(dayEnd(vence)),
        estado: 'activo',
        observaciones: $id('cr-obs').value.trim(),
        pagos: [],
        creado_por_uid: App.userData.uid,
        creado_por_nombre: App.userData.nombre,
        creado_en: firebase.firestore.FieldValue.serverTimestamp(),
      });
      showToast(`Crédito creado para ${clienteNombre}`);
      $id('cr-form').reset();
    } catch(err) { showToast('Error: ' + err.message, 'error'); }
  });
}

function vrAutoFill() {
  const el = $id('vr-prod');
  if (!el) return;
  const opt = el.options[el.selectedIndex];
  if (opt?.dataset.precio) $id('vr-precio').value = opt.dataset.precio;
  vrCalc();
}
function vrCalc() {
  const qty = Number($id('vr-qty')?.value || 0);
  const precio = Number($id('vr-precio')?.value || 0);
  const el = $id('vr-total');
  if (el) el.textContent = fmtMoney(qty * precio);
}

// =============================================
// HELPERS
// =============================================

function esc(str) {
  return String(str || '').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;').replace(/'/g,'&#39;');
}
