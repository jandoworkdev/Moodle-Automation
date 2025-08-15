
import tkinter as tk
from tkinter import ttk
from tkinter import filedialog, messagebox
import pandas as pd

APP_TITLE = "UAL • Workflow Moodle (Demo UI)"
APP_GEOMETRY = "1280x800"

# -------------------- Utilidad: Tooltips --------------------
class Tooltip:
    def __init__(self, widget, text, delay=600):
        self.widget = widget
        self.text = text
        self.delay = delay
        self._id = None
        self.tip = None
        widget.bind("<Enter>", self._schedule)
        widget.bind("<Leave>", self._hide)
        widget.bind("<ButtonPress>", self._hide)

    def _schedule(self, _=None):
        self._unschedule()
        self._id = self.widget.after(self.delay, self._show)

    def _unschedule(self):
        if self._id:
            self.widget.after_cancel(self._id)
            self._id = None

    def _show(self):
        if self.tip:
            return
        x, y, cx, cy = self.widget.bbox("insert") if self.widget.winfo_class() == "Text" else (0, 0, 0, 0)
        x += self.widget.winfo_rootx() + 20
        y += self.widget.winfo_rooty() + 25
        self.tip = tw = tk.Toplevel(self.widget)
        tw.wm_overrideredirect(True)
        tw.wm_geometry(f"+{x}+{y}")
        frm = tk.Frame(tw, background="#111827", borderwidth=0)
        frm.pack()
        lbl = tk.Label(frm, text=self.text, justify="left",
                       background="#111827", foreground="#E5E7EB",
                       relief="flat", padx=10, pady=6, font=("Segoe UI", 9))
        lbl.pack()
        # Marco suave
        frm.configure(highlightthickness=1, highlightbackground="#374151")

    def _hide(self, _=None):
        self._unschedule()
        if self.tip:
            self.tip.destroy()
            self.tip = None

# -------------------- App --------------------
class App(ttk.Frame):
    def __init__(self, master: tk.Tk):
        super().__init__(master)
        self.master.winfo_toplevel().title(APP_TITLE)
        self.master.winfo_toplevel().geometry(APP_GEOMETRY)
        self.master.winfo_toplevel().minsize(1100, 700)
        self._configure_style()
        self.df = None  # DataFrame para el CSV cargado
        self._configure_open_csv_callback = None
        # Header decorativo superior
        self._create_headerbar()
        self._create_menu()
        self._create_toolbar()
        self._create_body()
        self._create_statusbar()
        self._bind_shortcuts()

    # -------------------- UI Building Blocks --------------------
    def _configure_style(self):
        style = ttk.Style()
        theme = "clam" if "clam" in style.theme_names() else style.theme_use()
        style.theme_use(theme)

        # Paleta
        BG = "#F8FAFC"
        CARD = "#FFFFFF"
        INK = "#0F172A"
        SUBINK = "#475569"
        ACCENT = "#2563EB"
        ACCENT_HOVER = "#1D4ED8"
        SIDEBAR_BG = "#0F172A"
        SIDEBAR_FG = "#E2E8F0"
        STATUS_BG = "#111827"
        PROG_BG = "#3B82F6"
        STRIPE = "#F1F5F9"

        # Base
        style.configure("TFrame", background=BG)
        style.configure("TLabel", background=BG, foreground=INK)
        style.configure("Sidebar.TFrame", background=SIDEBAR_BG)
        style.configure("Sidebar.TLabel", background=SIDEBAR_BG, foreground=SIDEBAR_FG, font=("Segoe UI", 10))
        style.configure("Header.TLabel", font=("Segoe UI Semibold", 13))
        style.configure("Title.TLabel", font=("Segoe UI Semibold", 16))
        style.configure("Muted.TLabel", foreground=SUBINK)

        # Botones
        style.configure("Accent.TButton", padding=(10, 6), foreground="#FFFFFF", background=ACCENT)
        style.map("Accent.TButton",
                  background=[("active", ACCENT_HOVER), ("pressed", ACCENT_HOVER)],
                  foreground=[("disabled", "#9CA3AF")])
        style.configure("Danger.TButton", padding=(10, 6), foreground="#FFFFFF", background="#DC2626")
        style.map("Danger.TButton",
                  background=[("active", "#B91C1C"), ("pressed", "#B91C1C")])

        style.configure("Tool.TButton", padding=(10, 6))
        style.map("Tool.TButton", background=[("active", "#E2E8F0")])

        # Status bar
        style.configure("Status.TLabel", background=STATUS_BG, foreground="#D1D5DB")
        style.configure("Status.TFrame", background=STATUS_BG)
        style.configure("Status.Horizontal.TProgressbar",
                        troughcolor="#1F2937", background=PROG_BG, bordercolor="#1F2937", lightcolor=PROG_BG, darkcolor=PROG_BG)

        # Card
        style.configure("Card.TFrame", background=CARD)
        # Notebook
        style.configure("TNotebook", background=BG, tabposition='n')
        style.configure("TNotebook.Tab", padding=(18, 10), font=("Segoe UI", 10))
        style.map("TNotebook.Tab",
                  background=[("selected", "#E5E7EB")],
                  expand=[("selected", [1, 1, 1, 0])])

        # Treeview elegante
        style.configure("Treeview",
                        background="#FFFFFF",
                        foreground=INK,
                        rowheight=26,
                        fieldbackground="#FFFFFF",
                        bordercolor="#E5E7EB",
                        lightcolor="#E5E7EB",
                        darkcolor="#E5E7EB")
        style.configure("Treeview.Heading", font=("Segoe UI Semibold", 10), relief="flat")
        style.map("Treeview.Heading",
                  background=[("active", "#E5E7EB")])
        # Colores alternos
        style.map("Treeview",
                  background=[("selected", "#DBEAFE")],
                  foreground=[("selected", "#111827")])

        # Chips (labels)
        style.configure("Chip.TLabel", background="#EEF2FF", foreground="#3730A3", padding=(8, 2), font=("Segoe UI", 9))
        style.configure("ChipGreen.TLabel", background="#ECFDF5", foreground="#065F46", padding=(8, 2), font=("Segoe UI", 9))
        style.configure("ChipGray.TLabel", background="#F3F4F6", foreground="#374151", padding=(8, 2), font=("Segoe UI", 9))

    def _create_headerbar(self):
        # Banda superior con título y chips
        header = tk.Frame(self.master, bg="#0B1220")
        header.pack(side=tk.TOP, fill=tk.X)

        inner = tk.Frame(header, bg="#0B1220")
        inner.pack(fill=tk.X, padx=16, pady=12)

        title = tk.Label(inner, text="UAL • Workflow Moodle", fg="#E5E7EB", bg="#0B1220", font=("Segoe UI Semibold", 18))
        title.pack(side=tk.LEFT)

        chips = tk.Frame(inner, bg="#0B1220")
        chips.pack(side=tk.RIGHT)

        for txt, style in [
            ("⚙️ Demo UI", "ChipGray.TLabel"),
            ("🔒 Offline", "ChipGray.TLabel"),
            ("v0.2", "Chip.TLabel")
        ]:
            lbl = ttk.Label(chips, text=txt, style=style)
            lbl.pack(side=tk.LEFT, padx=4)

    def _create_menu(self):
        menubar = tk.Menu(self.master)

        file_menu = tk.Menu(menubar, tearoff=0)
        file_menu.add_command(label="🆕 Nuevo", accelerator="Ctrl+N")
        file_menu.add_command(label="📂 Abrir CSV…", accelerator="Ctrl+O", command=self._on_open_csv)
        file_menu.add_separator()
        file_menu.add_command(label="💾 Guardar Reporte…", accelerator="Ctrl+S")
        file_menu.add_separator()
        file_menu.add_command(label="🚪 Salir", accelerator="Ctrl+Q", command=self.master.destroy)

        edit_menu = tk.Menu(menubar, tearoff=0)
        edit_menu.add_command(label="⚙️ Preferencias…")

        view_menu = tk.Menu(menubar, tearoff=0)
        self.show_sidebar = tk.BooleanVar(value=True)
        view_menu.add_checkbutton(label="📑 Mostrar panel lateral", variable=self.show_sidebar, command=self._toggle_sidebar)

        tools_menu = tk.Menu(menubar, tearoff=0)
        tools_menu.add_command(label="🧪 Validar estructura")
        tools_menu.add_command(label="🧼 Limpiar y transformar")
        tools_menu.add_command(label="👀 Previsualizar")
        tools_menu.add_separator()
        tools_menu.add_command(label="🗂️ Generar categorías")
        tools_menu.add_command(label="🧩 Generar cursos")

        cfg_menu = tk.Menu(menubar, tearoff=0)
        cfg_menu.add_command(label="🛢️ Conexión MySQL…")
        cfg_menu.add_command(label="🌐 Conexión Moodle…")
        cfg_menu.add_separator()
        cfg_menu.add_command(label="📝 Gestionar plantillas…")

        help_menu = tk.Menu(menubar, tearoff=0)
        help_menu.add_command(label="❓ Ayuda")
        help_menu.add_command(label="ℹ️ Acerca de…")

        menubar.add_cascade(label="Archivo", menu=file_menu)
        menubar.add_cascade(label="Editar", menu=edit_menu)
        menubar.add_cascade(label="Ver", menu=view_menu)
        menubar.add_cascade(label="Herramientas", menu=tools_menu)
        menubar.add_cascade(label="Configuración", menu=cfg_menu)
        menubar.add_cascade(label="Ayuda", menu=help_menu)

        self.master.winfo_toplevel().config(menu=menubar)

    def _create_toolbar(self):
        bar = ttk.Frame(self.master, padding=(12, 8))
        bar.pack(side=tk.TOP, fill=tk.X)

        btn_open = ttk.Button(bar, text="📂 Abrir CSV", style="Tool.TButton", command=self._on_open_csv)
        btn_open.pack(side=tk.LEFT)
        Tooltip(btn_open, "Selecciona un archivo CSV/Excel")

        ttk.Separator(bar, orient=tk.VERTICAL).pack(side=tk.LEFT, fill=tk.Y, padx=6)
        btn_val = ttk.Button(bar, text="🧪 Validar", style="Tool.TButton")
        btn_val.pack(side=tk.LEFT)
        Tooltip(btn_val, "Ejecuta las validaciones configuradas")

        btn_clean = ttk.Button(bar, text="🧼 Limpiar", style="Tool.TButton")
        btn_clean.pack(side=tk.LEFT)
        Tooltip(btn_clean, "Normaliza mayúsculas, tildes y espacios")

        btn_prev = ttk.Button(bar, text="👀 Previsualizar", style="Tool.TButton")
        btn_prev.pack(side=tk.LEFT)
        Tooltip(btn_prev, "Muestra el dataset final")

        ttk.Separator(bar, orient=tk.VERTICAL).pack(side=tk.LEFT, fill=tk.Y, padx=6)
        btn_cat = ttk.Button(bar, text="🗂️ Generar Cat.", style="Tool.TButton")
        btn_cat.pack(side=tk.LEFT)
        Tooltip(btn_cat, "Genera la jerarquía de categorías")

        btn_course = ttk.Button(bar, text="🧩 Generar Cursos", style="Tool.TButton")
        btn_course.pack(side=tk.LEFT)
        Tooltip(btn_course, "Crea cursos (p. ej., DUMMY) para forzar categorías")

        ttk.Separator(bar, orient=tk.VERTICAL).pack(side=tk.LEFT, fill=tk.Y, padx=6)
        btn_export = ttk.Button(bar, text="📤 Exportar", style="Tool.TButton")
        btn_export.pack(side=tk.LEFT)
        Tooltip(btn_export, "Exporta reportes o CSVs resultantes")

        # Right side quick actions
        btn_mysql = ttk.Button(bar, text="🛢️ Conectar MySQL", style="Tool.TButton")
        btn_mysql.pack(side=tk.RIGHT)
        Tooltip(btn_mysql, "Configura la conexión a la base de datos")

        btn_moodle = ttk.Button(bar, text="🌐 Conectar Moodle", style="Tool.TButton")
        btn_moodle.pack(side=tk.RIGHT, padx=6)
        Tooltip(btn_moodle, "Configura el token y endpoint de Moodle")

    def _on_open_csv(self):
        file_path = filedialog.askopenfilename(
            title="Seleccionar archivo CSV",
            filetypes=[("Archivos CSV", "*.csv"), ("Todos los archivos", "*.*")]
        )
        if not file_path:
            return
        try:
            df = pd.read_csv(file_path, encoding="utf-8")
        except Exception as e:
            messagebox.showerror("Error al abrir CSV", f"No se pudo abrir el archivo:\n{e}")
            return
        self.df = df
        self._show_csv_preview_modal(df, file_path)

    def _show_csv_preview_modal(self, df, file_path):
        preview_rows = min(10, len(df))
        preview_cols = list(df.columns)
        preview_data = df.head(preview_rows).values.tolist()

        modal = tk.Toplevel(self.master)
        modal.title("Previsualización de CSV")
        modal.transient(self.master.winfo_toplevel())
        modal.grab_set()
        modal.geometry("1200x800")

        ttk.Label(modal, text=f"Archivo: {file_path}", style="Header.TLabel").pack(anchor="w", padx=16, pady=(16, 2))
        ttk.Label(modal, text=f"Filas: {len(df)}    Columnas: {len(df.columns)}", style="Muted.TLabel").pack(anchor="w", padx=16, pady=(0, 8))

        frame = ttk.Frame(modal)
        frame.pack(fill=tk.BOTH, expand=True, padx=16, pady=8)

        cols = preview_cols
        xscroll = ttk.Scrollbar(frame, orient="horizontal")
        xscroll.pack(side=tk.BOTTOM, fill=tk.X)
        yscroll = ttk.Scrollbar(frame, orient="vertical")
        yscroll.pack(side=tk.RIGHT, fill=tk.Y)
        table = ttk.Treeview(frame, columns=cols, show="headings", height=preview_rows, xscrollcommand=xscroll.set, yscrollcommand=yscroll.set)
        # Calcular ancho óptimo de cada columna
        for idx, c in enumerate(cols):
            table.heading(c, text=c)
            # Longitud máxima entre nombre de columna y valores
            maxlen = max([len(str(c))] + [len(str(row[idx])) for row in preview_data])
            width_px = min(max(60, maxlen * 9), 400)  # 9px por caracter, máx 400px
            table.column(c, width=width_px, anchor="w")

        for row in preview_data:
            table.insert("", "end", values=row)
        table.pack(fill=tk.BOTH, expand=True)
        xscroll.config(command=table.xview)
        yscroll.config(command=table.yview)

        # Scroll acelerado (factor 10)
        def _on_mousewheel_modal(event):
            factor = 10
            if event.state & 0x0001:  # Shift presionado
                table.xview_scroll(-1 * int((event.delta / 50) * factor), "units")
            else:
                table.yview_scroll(-1 * int((event.delta / 50) * factor), "units")
            return "break"
        table.bind("<MouseWheel>", _on_mousewheel_modal)
        table.bind("<Button-4>", lambda e: table.yview_scroll(-3, "units"))
        table.bind("<Button-5>", lambda e: table.yview_scroll(3, "units"))

        btns = ttk.Frame(modal)
        btns.pack(fill=tk.X, pady=8)
        ttk.Button(btns, text="Cerrar", command=modal.destroy).pack(side=tk.RIGHT, padx=16)

    def _create_body(self):
        container = ttk.Frame(self.master)
        container.pack(side=tk.TOP, fill=tk.BOTH, expand=True)

        container.columnconfigure(0, weight=0)
        container.columnconfigure(1, weight=1)
        container.rowconfigure(0, weight=1)

        # Sidebar
        self.sidebar = ttk.Frame(container, style="Sidebar.TFrame", padding=12)
        self.sidebar.grid(row=0, column=0, sticky="nsw")

        title_sb = ttk.Label(self.sidebar, text="Pasos del flujo", style="Sidebar.TLabel")
        title_sb.pack(anchor="w", pady=(0, 6))

        self._sidebar_steps = [
            "1. Ingesta",
            "2. Validación",
            "3. Transformación",
            "4. Previsualización",
            "5. Generación categorías",
            "6. Generación cursos",
            "7. Publicación / Notificación",
            "8. Auditoría"
        ]
        self._sidebar_labels = []
        for i, s in enumerate(self._sidebar_steps):
            wrap = tk.Frame(self.sidebar, bg="#0F172A")
            wrap.pack(fill=tk.X, pady=2)
            dot = tk.Label(wrap, text="●", fg="#64748B", bg="#0F172A", font=("Segoe UI", 9))
            dot.pack(side=tk.LEFT, padx=(2, 6))
            lbl = ttk.Label(wrap, text=s, style="Sidebar.TLabel")
            lbl.pack(side=tk.LEFT, anchor="w")
            self._sidebar_labels.append((wrap, dot, lbl))

        # Main area with tabs
        main = ttk.Notebook(container)
        main.grid(row=0, column=1, sticky="nsew")

        self.tab_ingesta = self._build_tab_ingesta(main)
        self.tab_validacion = self._build_tab_validacion(main)
        self.tab_transform = self._build_tab_transform(main)
        self.tab_preview = self._build_tab_preview(main)
        self.tab_moodle = self._build_tab_moodle(main)
        self.tab_logs = self._build_tab_logs(main)
        self.tab_config = self._build_tab_config(main)

        main.add(self.tab_ingesta, text="📥 Ingesta")
        main.add(self.tab_validacion, text="🧪 Validación")
        main.add(self.tab_transform, text="🧼 Transformación")
        main.add(self.tab_preview, text="👀 Previsualización")
        main.add(self.tab_moodle, text="🌐 Moodle")
        main.add(self.tab_logs, text="📊 Monitoreo & Logs")
        main.add(self.tab_config, text="⚙️ Configuración")

        # Resaltado del paso actual por pestaña
        def on_tab_change(event):
            idx = event.widget.index("current")
            self._highlight_sidebar(idx)
        main.bind("<<NotebookTabChanged>>", on_tab_change)
        self._highlight_sidebar(0)

    def _highlight_sidebar(self, active_index: int):
        for i, (wrap, dot, lbl) in enumerate(self._sidebar_labels):
            if i == active_index:
                wrap.configure(bg="#111827")
                dot.configure(fg="#22C55E", bg="#111827")  # verde activo
                lbl.configure(style="Sidebar.TLabel")
            else:
                wrap.configure(bg="#0F172A")
                dot.configure(fg="#64748B", bg="#0F172A")

    def _create_statusbar(self):
        status = ttk.Frame(self.master, style="Status.TFrame")
        status.pack(side=tk.BOTTOM, fill=tk.X)

        self.status_label = ttk.Label(status, text="Listo", style="Status.TLabel")
        self.status_label.pack(side=tk.LEFT, padx=10, pady=6)

        self.progress = ttk.Progressbar(status, orient=tk.HORIZONTAL, mode="determinate", length=220, style="Status.Horizontal.TProgressbar")
        self.progress.pack(side=tk.RIGHT, padx=12, pady=6)

    # -------------------- Tabs --------------------
    def _build_tab_ingesta(self, parent):
        frame = ttk.Frame(parent, padding=16)

        header = ttk.Label(frame, text="1. Ingesta de datos (CSV/Excel)", style="Title.TLabel")
        header.pack(anchor="w")
        ttk.Label(frame, text="Selecciona un archivo y mapea columnas a los atributos estándar.", style="Muted.TLabel").pack(anchor="w", pady=(2, 12))

        card = ttk.Frame(frame, style="Card.TFrame", padding=16)
        card.pack(fill=tk.BOTH, expand=True)
        # Borde suave
        card.configure(borderwidth=1)
        card.configure(relief="flat")
        card.configure(width=1)

        top = ttk.Frame(card)
        top.pack(fill=tk.X)

        # --- Widgets para selección de archivo, codificación y delimitador ---
        self.ingesta_file_path = tk.StringVar()
        self.ingesta_encoding = tk.StringVar(value="utf-8")
        self.ingesta_sep = tk.StringVar(value=",")

        def on_select_file():
            file_path = filedialog.askopenfilename(
                title="Seleccionar archivo CSV",
                filetypes=[("Archivos CSV", "*.csv"), ("Todos los archivos", "*.*")]
            )
            if file_path:
                self.ingesta_file_path.set(file_path)
                lbl_file.config(text=file_path)

        btn_sel = ttk.Button(top, text="📂 Seleccionar archivo…", command=on_select_file)
        btn_sel.pack(side=tk.LEFT)
        Tooltip(btn_sel, "Abrir CSV o Excel")
        lbl_file = ttk.Label(top, text="", style="Muted.TLabel")
        lbl_file.pack(side=tk.LEFT, padx=(8,0))

        ttk.Label(top, text="Codificación: ").pack(side=tk.LEFT, padx=(12, 2))
        cb_enc = ttk.Combobox(top, textvariable=self.ingesta_encoding, values=["utf-8", "latin-1", "utf-16"], width=12, state="readonly")
        cb_enc.pack(side=tk.LEFT)

        ttk.Label(top, text="Delimitador: ").pack(side=tk.LEFT, padx=(12, 2))
        cb_del = ttk.Combobox(top, textvariable=self.ingesta_sep, values=[", (coma)", "; (punto y coma)", "\\t (tab)", "| (pipe)"], width=18, state="readonly")
        cb_del.pack(side=tk.LEFT)

        # Botón para cargar y mostrar datos
        def on_load_csv():
            file_path = self.ingesta_file_path.get()
            encoding = self.ingesta_encoding.get()
            sep_map = {", (coma)": ",", "; (punto y coma)": ";", "\\t (tab)": "\t", "| (pipe)": "|"}
            sep = sep_map.get(self.ingesta_sep.get(), ",")
            if not file_path:
                messagebox.showwarning("Archivo no seleccionado", "Por favor selecciona un archivo CSV.")
                return
            try:
                df = pd.read_csv(file_path, encoding=encoding, sep=sep)
            except Exception as e:
                messagebox.showerror("Error al abrir CSV", f"No se pudo abrir el archivo:\n{e}")
                return
            self.df = df
            self._update_detected_columns(df)
            self._show_csv_preview_modal(df, file_path)

        btn_load = ttk.Button(top, text="👀 Previsualizar datos", style="Accent.TButton", command=on_load_csv)
        btn_load.pack(side=tk.LEFT, padx=(16,0))

        ttk.Separator(card).pack(fill=tk.X, pady=12)

        # --- Paneles de mapeo (pueden actualizarse tras cargar CSV) ---
        map_frame = ttk.Frame(card)
        map_frame.pack(fill=tk.BOTH, expand=True)

        left = ttk.Frame(map_frame)
        left.pack(side=tk.LEFT, fill=tk.BOTH, expand=True, padx=(0, 8))
        ttk.Label(left, text="Columnas detectadas").pack(anchor="w")
        self.src_cols = ttk.Treeview(left, columns=("col",), show="headings", height=8)
        self.src_cols.heading("col", text="Nombre")
        self.src_cols.column("col", width=50, anchor="w")
        self.src_cols.tag_configure("oddrow", background="#FFFFFF")
        self.src_cols.tag_configure("evenrow", background="#F8FAFC")
        self.src_cols.pack(fill=tk.BOTH, expand=True)

        # Función para actualizar las columnas detectadas tras cargar un CSV
        def _update_detected_columns(df):
            self.src_cols.delete(*self.src_cols.get_children())
            for i, col in enumerate(df.columns):
                tag = "evenrow" if i % 2 == 0 else "oddrow"
                self.src_cols.insert("", "end", values=(col,), tags=(tag,))
        self._update_detected_columns = _update_detected_columns

        center = ttk.Frame(map_frame)
        center.pack(side=tk.LEFT, fill=tk.Y)
        ttk.Button(center, text="➤").pack(pady=4)
        ttk.Button(center, text="⬅").pack(pady=4)

        right = ttk.Frame(map_frame)
        right.pack(side=tk.LEFT, fill=tk.BOTH, expand=True, padx=(8, 0))
        ttk.Label(right, text="Atributos estándar").pack(anchor="w")
        std_cols = ttk.Treeview(right, columns=("attr", "map"), show="headings", height=12)
        std_cols.heading("attr", text="Atributo")
        std_cols.heading("map", text="Asignación")
        std_cols.tag_configure("oddrow", background="#FFFFFF")
        std_cols.tag_configure("evenrow", background="#F8FAFC")
        attrs = ["periodo_exc","mes_exc","fecha_exc","hora_exc","m_catg_raiz","m_catg_mes","m_catg_sede","m_catg_turno","m_catg_ciclo","m_catg_aula","p_ciclo","p_aula","p_aforo","p_nombre_curso","p_nombre_docente","p_turno","p_sede","p_observacion","p_hora_inicio","p_hora_final"]
        for i, a in enumerate(attrs):
            tag = "evenrow" if i % 2 == 0 else "oddrow"
            std_cols.insert("", "end", values=(a, "—"), tags=(tag,))
        std_cols.pack(fill=tk.BOTH, expand=True)

        actions = ttk.Frame(frame)
        actions.pack(fill=tk.X, pady=10)
        ttk.Button(actions, text="✅ Validar mapeo", style="Accent.TButton").pack(side=tk.LEFT)
        ttk.Button(actions, text="🧹 Limpiar selección").pack(side=tk.LEFT, padx=8)

        return frame

    def _build_tab_validacion(self, parent):
        frame = ttk.Frame(parent, padding=16)
        ttk.Label(frame, text="2. Validación de estructura y calidad", style="Title.TLabel").pack(anchor="w")
        ttk.Label(frame, text="Reglas configurables: columnas obligatorias, formatos de fecha/hora, valores permitidos.", style="Muted.TLabel").pack(anchor="w", pady=(2, 12))

        card = ttk.Frame(frame, style="Card.TFrame", padding=16)
        card.pack(fill=tk.BOTH, expand=True)

        rules = ttk.Treeview(card, columns=("regla", "estado"), show="headings", height=12)
        rules.heading("regla", text="Regla")
        rules.heading("estado", text="Resultado")
        rules.column("regla", width=500, anchor="w")
        rules.column("estado", width=150, anchor="center")
        rules.tag_configure("ok", background="#ECFDF5")
        rules.tag_configure("warn", background="#FEF3C7")
        rules.tag_configure("err", background="#FEE2E2")
        sample = [
            ("Columnas obligatorias presentes", "Pendiente", "warn"),
            ("Formato de fecha (YYYY-MM-DD)", "Pendiente", "warn"),
            ("Valores permitidos en TURNO", "Pendiente", "warn"),
        ]
        for r, s, tag in sample:
            rules.insert("", "end", values=(r, s), tags=(tag,))
        rules.pack(fill=tk.BOTH, expand=True)

        btns = ttk.Frame(frame)
        btns.pack(fill=tk.X, pady=10)
        ttk.Button(btns, text="▶ Ejecutar validaciones", style="Accent.TButton").pack(side=tk.LEFT)
        ttk.Button(btns, text="📄 Exportar informe…").pack(side=tk.LEFT, padx=8)

        return frame

    def _build_tab_transform(self, parent):
        frame = ttk.Frame(parent, padding=16)
        ttk.Label(frame, text="3. Transformación (normalización y limpieza)", style="Title.TLabel").pack(anchor="w")
        ttk.Label(frame, text="Define reglas de estandarización para nombres, tildes, fechas y deduplicación.", style="Muted.TLabel").pack(anchor="w", pady=(2, 12))

        card = ttk.Frame(frame, style="Card.TFrame", padding=16)
        card.pack(fill=tk.BOTH, expand=True)

        controls = ttk.Frame(card)
        controls.pack(fill=tk.X)
        ttk.Checkbutton(controls, text="Pasar a MAYÚSCULAS").pack(side=tk.LEFT)
        ttk.Checkbutton(controls, text="Quitar tildes").pack(side=tk.LEFT, padx=10)
        ttk.Checkbutton(controls, text="Recortar espacios").pack(side=tk.LEFT, padx=10)
        ttk.Checkbutton(controls, text="Eliminar duplicados").pack(side=tk.LEFT, padx=10)

        ttk.Separator(card).pack(fill=tk.X, pady=12)

        ttk.Label(card, text="Vista previa de transformaciones").pack(anchor="w")
        preview = ttk.Treeview(card, columns=("col1","col2","col3"), show="headings", height=12)
        for i, h in enumerate(["Antes", "Regla", "Después" ], start=1):
            preview.heading(f"col{i}", text=h)
            preview.column(f"col{i}", anchor="w", width=220 if i != 2 else 160)
        preview.tag_configure("oddrow", background="#FFFFFF")
        preview.tag_configure("evenrow", background="#F8FAFC")
        # filas de ejemplo
        data = [
            ("' Rosita  '", "recortar espacios", "Rosita"),
            ("mañana", "mayúsculas", "MAÑANA"),
            ("clinica", "tildes", "clínica"),
        ]
        for i, row in enumerate(data):
            tag = "evenrow" if i % 2 == 0 else "oddrow"
            preview.insert("", "end", values=row, tags=(tag,))
        preview.pack(fill=tk.BOTH, expand=True)

        actions = ttk.Frame(frame)
        actions.pack(fill=tk.X, pady=10)
        ttk.Button(actions, text="⚙️ Aplicar reglas", style="Accent.TButton").pack(side=tk.LEFT)
        ttk.Button(actions, text="↩ Deshacer cambios").pack(side=tk.LEFT, padx=8)

        return frame

    def _build_tab_preview(self, parent):
        frame = ttk.Frame(parent, padding=16)
        ttk.Label(frame, text="4. Previsualización y reporte", style="Title.TLabel").pack(anchor="w")
        ttk.Label(frame, text="Verificación del dataset final previo a la carga en Moodle.", style="Muted.TLabel").pack(anchor="w", pady=(2, 12))

        top = ttk.Frame(frame, style="Card.TFrame", padding=16)
        top.pack(fill=tk.BOTH, expand=False)
        ttk.Label(top, text="Resumen:").grid(row=0, column=0, sticky="w")
        self.lbl_rows = ttk.Label(top, text="Filas: 0", style="Muted.TLabel")
        self.lbl_rows.grid(row=0, column=1, padx=12)
        self.lbl_cat = ttk.Label(top, text="Categorías únicas: 0", style="Muted.TLabel")
        self.lbl_cat.grid(row=0, column=2, padx=12)
        self.lbl_courses = ttk.Label(top, text="Cursos a crear: 0", style="Muted.TLabel")
        self.lbl_courses.grid(row=0, column=3, padx=12)

        table_card = ttk.Frame(frame, style="Card.TFrame", padding=16)
        table_card.pack(fill=tk.BOTH, expand=True, pady=(12,0))

        cols = ("PERIODO","MES","SEDE","TURNO","CICLO","AULA","DOCENTE","CURSO")
        # Scrollbar horizontal
        xscroll = ttk.Scrollbar(table_card, orient="horizontal")
        xscroll.pack(side=tk.BOTTOM, fill=tk.X)
        table = ttk.Treeview(table_card, columns=cols, show="headings", height=18, xscrollcommand=xscroll.set)
        for c in cols:
            table.heading(c, text=c)
            table.column(c, width=140, anchor="w")
        table.tag_configure("oddrow", background="#FFFFFF")
        table.tag_configure("evenrow", background="#F1F5F9")
        # filas de ejemplo
        for i in range(8):
            tag = "evenrow" if i % 2 == 0 else "oddrow"
            table.insert("", "end", values=("2025-II","AGOSTO","ROSITA","MAÑANA","CICLO I","O-302","MENDOZA","FUNDAMENTOS"), tags=(tag,))
        table.pack(fill=tk.BOTH, expand=True)
        xscroll.config(command=table.xview)

        # Mejorar velocidad de scroll con mouse
        def _on_mousewheel(event):
            # Shift+Wheel = horizontal, normal = vertical
            factor = 10  # mayor factor = más rápido
            if event.state & 0x0001:  # Shift presionado
                table.xview_scroll(-1 * int((event.delta / 50) * factor), "units")
            else:
                table.yview_scroll(-1 * int((event.delta / 50) * factor), "units")
            return "break"
        # Windows usa <MouseWheel>, Mac usa <MouseWheel> pero delta diferente
        table.bind("<MouseWheel>", _on_mousewheel)
        # Linux usa <Button-4>/<Button-5> para scroll vertical
        table.bind("<Button-4>", lambda e: table.yview_scroll(-3, "units"))
        table.bind("<Button-5>", lambda e: table.yview_scroll(3, "units"))

        actions = ttk.Frame(frame)
        actions.pack(fill=tk.X, pady=10)
        ttk.Button(actions, text="📄 Exportar reporte (CSV)").pack(side=tk.LEFT)
        ttk.Button(actions, text="🧪 Generar pre-cursos DUMMY").pack(side=tk.LEFT, padx=8)

        return frame

    def _build_tab_moodle(self, parent):
        frame = ttk.Frame(parent, padding=16)
        ttk.Label(frame, text="5. Integración con Moodle", style="Title.TLabel").pack(anchor="w")
        ttk.Label(frame, text="Configuración de endpoints, creación masiva de categorías y cursos.", style="Muted.TLabel").pack(anchor="w", pady=(2, 12))

        card = ttk.Frame(frame, style="Card.TFrame", padding=16)
        card.pack(fill=tk.BOTH, expand=True)

        form = ttk.Frame(card)
        form.pack(fill=tk.X)

        ttk.Label(form, text="URL del sitio Moodle").grid(row=0, column=0, sticky="w")
        ttk.Entry(form, width=50).grid(row=0, column=1, sticky="we", padx=8, pady=4)
        ttk.Label(form, text="Token del servicio").grid(row=1, column=0, sticky="w")
        ttk.Entry(form, width=50, show="•").grid(row=1, column=1, sticky="we", padx=8, pady=4)
        ttk.Label(form, text="Formato de categoría").grid(row=2, column=0, sticky="w")
        ttk.Entry(form, width=50).grid(row=2, column=1, sticky="we", padx=8, pady=4)

        form.columnconfigure(1, weight=1)

        ttk.Separator(card).pack(fill=tk.X, pady=12)

        actions = ttk.Frame(card)
        actions.pack(fill=tk.X)
        ttk.Button(actions, text="🔗 Probar conexión", style="Accent.TButton").pack(side=tk.LEFT)
        ttk.Button(actions, text="🗂️ Crear categorías").pack(side=tk.LEFT, padx=8)
        ttk.Button(actions, text="🧩 Crear cursos").pack(side=tk.LEFT, padx=8)

        return frame

    def _build_tab_logs(self, parent):
        frame = ttk.Frame(parent, padding=16)
        ttk.Label(frame, text="6. Monitoreo y bitácora", style="Title.TLabel").pack(anchor="w")
        ttk.Label(frame, text="Seguimiento de procesos, métricas y auditoría de cambios.", style="Muted.TLabel").pack(anchor="w", pady=(2, 12))

        split = ttk.Panedwindow(frame, orient=tk.HORIZONTAL)
        split.pack(fill=tk.BOTH, expand=True)

        # Left: metrics
        metrics = ttk.Frame(split, style="Card.TFrame", padding=16)
        ttk.Label(metrics, text="Métricas del último proceso", style="Header.TLabel").pack(anchor="w", pady=(0,8))
        grid = ttk.Treeview(metrics, columns=("metrica","valor"), show="headings", height=10)
        grid.heading("metrica", text="Métrica")
        grid.heading("valor", text="Valor")
        grid.column("metrica", width=240, anchor="w")
        grid.column("valor", width=120, anchor="center")
        grid.tag_configure("oddrow", background="#FFFFFF")
        grid.tag_configure("evenrow", background="#F8FAFC")
        sample = [("Filas leídas", "0"), ("Cursos generados", "0"), ("Categorías creadas", "0")]
        for i, (m, v) in enumerate(sample):
            tag = "evenrow" if i % 2 == 0 else "oddrow"
            grid.insert("", "end", values=(m, v), tags=(tag,))
        grid.pack(fill=tk.BOTH, expand=True)

        # Right: logs
        logs = ttk.Frame(split, style="Card.TFrame", padding=16)
        ttk.Label(logs, text="Registro de eventos", style="Header.TLabel").pack(anchor="w", pady=(0,8))
        txt = tk.Text(logs, height=16, wrap="word", bg="#0B1220", fg="#D1D5DB", insertbackground="#93C5FD", bd=0, relief="flat")
        txt.insert("end", "[INFO] UI iniciada.\n")
        txt.pack(fill=tk.BOTH, expand=True)

        split.add(metrics, weight=1)
        split.add(logs, weight=2)

        actions = ttk.Frame(frame)
        actions.pack(fill=tk.X, pady=10)
        ttk.Button(actions, text="📦 Exportar logs").pack(side=tk.LEFT)
        ttk.Button(actions, text="🧽 Limpiar").pack(side=tk.LEFT, padx=8)

        return frame

    def _build_tab_config(self, parent):
        frame = ttk.Frame(parent, padding=16)
        ttk.Label(frame, text="7. Configuración & Plantillas", style="Title.TLabel").pack(anchor="w")
        ttk.Label(frame, text="Define esquema de columnas estándar, patrones de nombres y conexiones.", style="Muted.TLabel").pack(anchor="w", pady=(2, 12))

        cfg = ttk.Frame(frame, style="Card.TFrame", padding=16)
        cfg.pack(fill=tk.BOTH, expand=True)

        left = ttk.Frame(cfg)
        left.pack(side=tk.LEFT, fill=tk.BOTH, expand=True, padx=(0,8))
        ttk.Label(left, text="Atributos estándar").pack(anchor="w")
        attrs = ttk.Treeview(left, columns=("attr","tipo","obligatorio"), show="headings", height=14)
        attrs.heading("attr", text="Atributo")
        attrs.heading("tipo", text="Tipo")
        attrs.heading("obligatorio", text="Obligatorio")
        attrs.column("attr", width=200, anchor="w")
        attrs.column("tipo", width=120, anchor="center")
        attrs.column("obligatorio", width=120, anchor="center")
        attrs.tag_configure("oddrow", background="#FFFFFF")
        attrs.tag_configure("evenrow", background="#F8FAFC")
        sample = [
            ("periodo_exc", "TEXT", "Sí"),
            ("mes_exc", "TEXT", "Sí"),
            ("fecha_exc", "DATE", "Sí"),
            ("hora_exc", "TIME", "Sí"),
            ("m_catg_raiz", "TEXT", "Sí"),
            ("m_catg_mes", "TEXT", "Sí"),
        ]
        for i, row in enumerate(sample):
            tag = "evenrow" if i % 2 == 0 else "oddrow"
            attrs.insert("", "end", values=row, tags=(tag,))
        attrs.pack(fill=tk.BOTH, expand=True)

        right = ttk.Frame(cfg)
        right.pack(side=tk.LEFT, fill=tk.BOTH, expand=True, padx=(8,0))
        ttk.Label(right, text="Conexiones").pack(anchor="w")
        form = ttk.Frame(right)
        form.pack(fill=tk.X)
        ttk.Label(form, text="MySQL host").grid(row=0, column=0, sticky="w")
        ttk.Entry(form).grid(row=0, column=1, sticky="we", padx=8, pady=4)
        ttk.Label(form, text="MySQL puerto").grid(row=1, column=0, sticky="w")
        ttk.Entry(form).grid(row=1, column=1, sticky="we", padx=8, pady=4)
        ttk.Label(form, text="Usuario").grid(row=2, column=0, sticky="w")
        ttk.Entry(form).grid(row=2, column=1, sticky="we", padx=8, pady=4)
        ttk.Label(form, text="Base de datos").grid(row=3, column=0, sticky="w")
        ttk.Entry(form).grid(row=3, column=1, sticky="we", padx=8, pady=4)
        ttk.Label(form, text="Token Moodle").grid(row=4, column=0, sticky="w")
        ttk.Entry(form, show='•').grid(row=4, column=1, sticky="we", padx=8, pady=4)
        form.columnconfigure(1, weight=1)

        actions = ttk.Frame(frame)
        actions.pack(fill=tk.X, pady=10)
        ttk.Button(actions, text="💾 Guardar configuración", style="Accent.TButton").pack(side=tk.LEFT)
        ttk.Button(actions, text="↺ Restaurar valores").pack(side=tk.LEFT, padx=8)

        return frame

    # -------------------- Helpers --------------------
    def _toggle_sidebar(self):
        if self.show_sidebar.get():
            self.sidebar.grid()  # show
        else:
            self.sidebar.grid_remove()  # hide

    def _bind_shortcuts(self):
        self.master.bind_all("<Control-n>", lambda e: None)
        self.master.bind_all("<Control-o>", lambda e: None)
        self.master.bind_all("<Control-s>", lambda e: None)
        self.master.bind_all("<Control-q>", lambda e: self.master.destroy())

def main():
    root = tk.Tk()
    App(root)
    root.mainloop()

if __name__ == "__main__":
    main()
