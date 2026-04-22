import { Topic } from './types';

export const TOPICS: Topic[] = [
  // --- ALGORITHMS ---
  {
    id: 'quicksort',
    title: 'Quicksort',
    category: 'Algorithms',
    description: 'Эффективный алгоритм сортировки на основе принципа «разделяй и властвуй».',
    complexity: {
      best: 'O(n log n)',
      average: 'O(n log n)',
      worst: 'O(n²)',
      time: 'O(n log n)',
      space: 'O(log n)'
    },
    code: `# 1. Standard Quicksort
def quicksort(arr):
    if len(arr) <= 1:
        return arr
    pivot = arr[len(arr) // 2]
    left = [x for x in arr if x < pivot]
    middle = [x for x in arr if x == pivot]
    right = [x for x in arr if x > pivot]
    return quicksort(left) + middle + quicksort(right)

# 2. Parallel Quicksort (с использованием ProcessPoolExecutor)
from concurrent.futures import ProcessPoolExecutor

def parallel_quicksort(arr, depth=0):
    if len(arr) <= 1:
        return arr
    pivot = arr[len(arr) // 2]
    left = [x for x in arr if x < pivot]
    middle = [x for x in arr if x == pivot]
    right = [x for x in arr if x > pivot]
    
    # Лимитируем глубину ветвления процессов, чтобы избежать Overhead-а
    if depth < 2:
        with ProcessPoolExecutor() as executor:
            fut_left = executor.submit(parallel_quicksort, left, depth + 1)
            fut_right = executor.submit(parallel_quicksort, right, depth + 1)
            return fut_left.result() + middle + fut_right.result()
    else:
        return quicksort(left) + middle + quicksort(right)`,
    language: 'python',
    content: 'Основа алгоритма — выбор опорного элемента (pivot) и разбиение массива. Параллельная версия (Parallel Quicksort) полезна для огромных массивов на многоядерных машинах. В Python для распараллеливания CPU-bound задач и обхода GIL применяется модуль multiprocessing (или ProcessPoolExecutor), однако накладные расходы на порождение процессов требуют лимитирования максимальной глубины (depth) создания дочерних воркеров.'
  },
  {
    id: 'merge-sort',
    title: 'Merge Sort',
    category: 'Algorithms',
    description: 'Стабильный алгоритм сортировки с гарантированным временем выполнения.',
    complexity: {
      time: 'O(n log n)',
      space: 'O(n)'
    },
    code: `def merge_sort(arr):
    if len(arr) > 1:
        mid = len(arr) // 2
        L = arr[:mid]
        R = arr[mid:]

        merge_sort(L)
        merge_sort(R)

        i = j = k = 0
        while i < len(L) and j < len(R):
            if L[i] < R[j]:
                arr[k] = L[i]
                i += 1
            else:
                arr[k] = R[j]
                j += 1
            k += 1

        while i < len(L):
            arr[k] = L[i]
            i += 1
            k += 1
        while j < len(R):
            arr[k] = R[j]
            j += 1
            k += 1
    return arr`,
    language: 'python',
    content: 'Особенности: Стабильность, O(n) доп. памяти. Подходит для внешних сортировок.'
  },
  {
    id: 'insertion-sort',
    title: 'Insertion Sort',
    category: 'Algorithms',
    description: 'Сортировка вставками. Простой и эффективный для малых или почти отсортированных данных.',
    complexity: {
      best: 'O(n)',
      average: 'O(n²)',
      worst: 'O(n²)',
      time: 'O(n²)',
      space: 'O(1)'
    },
    code: `def insertion_sort(arr):
    for i in range(1, len(arr)):
        key = arr[i]
        j = i - 1
        # Сдвигаем элементы, которые больше key
        while j >= 0 and key < arr[j]:
            arr[j + 1] = arr[j]
            j -= 1
        arr[j + 1] = key
    return arr`,
    language: 'python',
    content: 'Используется как часть гибридных алгоритмов (например, Timsort, где короткие участки массива сортируются именно вставками).'
  },
  {
    id: 'timsort',
    title: 'Timsort',
    category: 'Algorithms',
    description: 'Гибридный алгоритм сортировки (Merge Sort + Insertion Sort). Стандарт в Python и Java.',
    complexity: {
      best: 'O(n)',
      average: 'O(n log n)',
      worst: 'O(n log n)',
      time: 'O(n log n)',
      space: 'O(n)'
    },
    code: `RUN = 32

def insertion_sort(arr, left, right):
    for i in range(left + 1, right + 1):
        j = i
        while j > left and arr[j] < arr[j - 1]:
            arr[j], arr[j - 1] = arr[j - 1], arr[j]
            j -= 1

def merge(arr, l, m, r):
    # Копируем данные во временные массивы
    left_part = arr[l:m + 1]
    right_part = arr[m + 1:r + 1]
    
    i = j = 0
    k = l
    
    # Слияние
    while i < len(left_part) and j < len(right_part):
        if left_part[i] <= right_part[j]:
            arr[k] = left_part[i]
            i += 1
        else:
            arr[k] = right_part[j]
            j += 1
        k += 1
        
    while i < len(left_part):
        arr[k] = left_part[i]
        i += 1
        k += 1
    while j < len(right_part):
        arr[k] = right_part[j]
        j += 1
        k += 1

def timsort(arr):
    n = len(arr)
    # Шаг 1: Сортируем мелкие подмассивы вставками
    for i in range(0, n, RUN):
        insertion_sort(arr, i, min((i + RUN - 1), (n - 1)))
        
    # Шаг 2: Сливаем (Merge) отсортированные куски (Runs)
    size = RUN
    while size < n:
        for left in range(0, n, 2 * size):
            mid = min(n - 1, left + size - 1)
            right = min((left + 2 * size - 1), (n - 1))
            if mid < right:
                merge(arr, left, mid, right)
        size *= 2
    return arr`,
    language: 'python',
    content: 'Timsort ищет уже отсортированные последовательности (run) в данных. Если последовательность слишком короткая, она увеличивается с помощью сортировки вставками (Insertion Sort). Затем полученные подмассивы сливаются модифицированным алгоритмом слияния (Merge Sort, с использованием "галопа"). Алгоритм алгоритмически стабилен и сильно оптимизирован для реальных данных, где часто встречаются уже отсортированные последовательности элементов. В Python встроен под капот функций sorted() и метода list.sort().'
  },

  // --- DATA STRUCTURES ---
  {
    id: 'linked-lists',
    title: 'Linked Lists',
    category: 'Data Structures',
    description: 'Линейная структура данных, где элементы связаны указателями.',
    complexity: {
      time: 'O(n) access, O(1) insert at head',
      space: 'O(n)'
    },
    code: `# 1. Singly Linked List (Односвязный список)
class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next

class SinglyLinkedList:
    def __init__(self):
        self.head = None

    def insert_at_head(self, val):
        new_node = ListNode(val)
        new_node.next = self.head
        self.head = new_node

# 2. Doubly Linked List (Двусвязный список)
class DoubleNode:
    def __init__(self, val=0, prev=None, next=None):
        self.val = val
        self.prev = prev
        self.next = next

class DoublyLinkedList:
    def __init__(self):
        self.head = None
        self.tail = None

    def append(self, val):
        new_node = DoubleNode(val)
        if not self.head:
            self.head = self.tail = new_node
            return
        
        # Двусторонняя связь с предыдущим элементом (tail)
        self.tail.next = new_node
        new_node.prev = self.tail
        self.tail = new_node`,
    language: 'python',
    content: 'Singly vs Doubly Linked list. Основное преимущество — константное время вставки/удаления по сравнению с массивом.'
  },
  {
    id: 'avl-tree',
    title: 'AVL Tree',
    category: 'Data Structures',
    description: 'Самобалансирующееся дерево поиска (BST).',
    complexity: {
      time: 'O(log n)',
      space: 'O(n)'
    },
    code: `class AVLNode:
    def __init__(self, key):
        self.key = key
        self.left = None
        self.right = None
        self.height = 1

class AVLTree:
    def get_height(self, root):
        if not root:
            return 0
        return root.height

    def get_balance(self, root):
        if not root:
            return 0
        return self.get_height(root.left) - self.get_height(root.right)

    def right_rotate(self, y):
        x = y.left
        T2 = x.right
        x.right = y
        y.left = T2
        y.height = 1 + max(self.get_height(y.left), self.get_height(y.right))
        x.height = 1 + max(self.get_height(x.left), self.get_height(x.right))
        return x

    def left_rotate(self, x):
        y = x.right
        T2 = y.left
        y.left = x
        x.right = T2
        x.height = 1 + max(self.get_height(x.left), self.get_height(x.right))
        y.height = 1 + max(self.get_height(y.left), self.get_height(y.right))
        return y

    def insert(self, root, key):
        if not root:
            return AVLNode(key)
        
        # 1. Обычная BST вставка
        if key < root.key:
            root.left = self.insert(root.left, key)
        elif key > root.key:
            root.right = self.insert(root.right, key)
        else:
            return root

        # 2. Обновляем высоту предка
        root.height = 1 + max(self.get_height(root.left), self.get_height(root.right))

        # 3. Получаем баланс для проверки на ротации
        balance = self.get_balance(root)

        # Left Left
        if balance > 1 and key < root.left.key:
            return self.right_rotate(root)
        # Right Right
        if balance < -1 and key > root.right.key:
            return self.left_rotate(root)
        # Left Right
        if balance > 1 and key > root.left.key:
            root.left = self.left_rotate(root.left)
            return self.right_rotate(root)
        # Right Left
        if balance < -1 and key < root.right.key:
            root.right = self.right_rotate(root.right)
            return self.left_rotate(root)

        return root`,
    language: 'python',
    content: 'Поддерживает строгий баланс так, чтобы разница высот поддеревьев любого узла не превышала 1. При нарушении баланса использует 4 вида ротаций: Left-Left, Right-Right, Left-Right, Right-Left. Отличное решение для систем с частым чтением, но проигрывает Red-Black Tree по скорости частых вставок/удалений.'
  },

  // --- PYTHON INTERNALS ---
  {
    id: 'gil',
    title: 'Global Interpreter Lock (GIL)',
    category: 'Python Internals',
    description: 'Механизм, защищающий доступ к объектам Python.',
    content: 'Предотвращает одновременное выполнение байт-кода Python несколькими нативными потоками. Основное влияние на CPU-bound задачи.'
  },
  {
    id: 'concurrency-models',
    title: 'Threading vs Multiprocessing vs Asyncio',
    category: 'Python Internals',
    description: 'Способы конкурентного выполнения кода в Python.',
    comparison: {
      headers: ['Модель', 'Подходит для', 'Влияние GIL'],
      rows: [
        ['Threading', 'I/O-bound задачи', 'Освобождается при I/O'],
        ['Multiprocessing', 'CPU-bound задачи', 'Обход GIL через новый процесс'],
        ['Asyncio', 'Высоконагруженный I/O', 'Однопоточный Event Loop']
      ]
    },
    content: 'Выбор зависит от характера нагрузки: вычисления (CPU) или ожидание (I/O).'
  },
  {
    id: 'slots',
    title: '__slots__',
    category: 'Python Internals',
    description: 'Способ ограничения атрибутов экземпляра для экономии памяти.',
    code: `class Point:
    __slots__ = ('x', 'y')
    def __init__(self, x, y):
        self.x = x
        self.y = y`,
    language: 'python',
    content: 'Заменяет словарь __dict__ на компактный массив, экономя до 3-4 раз больше памяти на больших объемах объектов.'
  },

  // --- SYSTEM DESIGN ---
  {
    id: 'kafka-vs-rabbitmq',
    title: 'Kafka vs RabbitMQ',
    category: 'System Design',
    description: 'Брокеры сообщений vs Стриминговые платформы.',
    comparison: {
      headers: ['Feature', 'RabbitMQ', 'Kafka'],
      rows: [
        ['Model', 'Push (Smart Broker)', 'Pull (Dumb Broker)'],
        ['Atomicity', 'Single message', 'Batch / Streams'],
        ['Replay', 'No (deleted on ack)', 'Yes (durable log)'],
        ['Latency', 'Low', 'Moderate (batching)']
      ]
    },
    content: 'RabbitMQ — для сложной маршрутизации и очередей задач. Kafka — для Big Data, аналитики и логов.'
  },
  {
    id: 'redis-lua',
    title: 'Redis & Lua Scripts',
    category: 'System Design',
    description: 'Распределенное кэширование и выполнение атомарных операций через Lua.',
    code: `-- Пример: Классическая реализация Rate Limiter
local requests = redis.call('GET', KEYS[1])
if requests and tonumber(requests) >= tonumber(ARGV[1]) then
    return 0 -- Лимит превышен
end
local current = redis.call('INCR', KEYS[1])
if current == 1 then
    # Устанавливаем TTL только при первом инкременте
    redis.call('EXPIRE', KEYS[1], ARGV[2])
end
return 1 -- Запрос разрешен`,
    language: 'lua',
    content: 'Одной из главных проблем распределенных систем является состояние "Race Condition" между микросервисами. Redis однопоточный, что позволяет выполнять команды по очереди. Но если вам нужно прочитать данные, проверить условие и записать обратно (Read-Modify-Write) так, чтобы никто другой не встрял между запросами, используются скрипты на Lua.\n\nLua-скрипт отправляется на сервер Redis и выполняется ЦЕЛИКОМ как одна огромная атомарная атомарная транзакция. Во время выполнения скрипта Redis блокирует выполнение ВСЕХ других команд от других клиентов. Это предотвращает состояния гонки, такие как "двойное списание" (Double Spending) или позволяет надежно реализовать паттерны Distributed Locking (как Redlock).'
  },
  {
    id: 'sql-vs-nosql',
    title: 'SQL vs NoSQL',
    category: 'System Design',
    description: 'Выбор базы данных.',
    comparison: {
      headers: ['Тип', 'Преимущества', 'Пример'],
      rows: [
        ['SQL (Postgres)', 'ACID, Индексы, Сложные JOIN', 'Финтех, Orders'],
        ['NoSQL (Mongo)', 'Scaling, Flexible Schema', 'Logs, Documents'],
        ['In-Memory (Redis)', 'Speed', 'Cache, Sessions']
      ]
    },
    content: 'SQL базы гарантируют ACID, в то время как NoSQL часто жертвуют консистентностью ради масштабируемости (BASE).'
  },
  {
    id: 'binary-search',
    title: 'Binary Search',
    category: 'Algorithms',
    description: 'Поиск элемента в отсортированном массиве.',
    complexity: {
      time: 'O(log n)',
      space: 'O(1)'
    },
    code: `def binary_search(arr, target):
    low, high = 0, len(arr) - 1
    while low <= high:
        mid = (low + high) // 2
        if arr[mid] == target:
            return mid
        elif arr[mid] < target:
            low = mid + 1
        else:
            high = mid - 1
    return -1`,
    language: 'python',
    content: 'Делит область поиска пополам на каждой итерации. Требует отсортированных данных.'
  },
  {
    id: 'bfs',
    title: 'Breadth-First Search (BFS)',
    category: 'Algorithms',
    description: 'Поиск в ширину. Идеально для поиска кратчайшего пути в невзвешенном графе.',
    complexity: {
      time: 'O(V + E)',
      space: 'O(V)'
    },
    code: `from collections import deque

def bfs(graph, start):
    visited = set([start])
    queue = deque([start])
    
    while queue:
        vertex = queue.popleft()
        for neighbor in graph[vertex]:
            if neighbor not in visited:
                visited.add(neighbor)
                queue.append(neighbor)
    return visited`,
    language: 'python',
    content: 'Обходит граф слоями (в ширину). Для реализации всегда используется Очередь (Queue). Если граф взвешенный, BFS не гарантирует кратчайший путь (используйте алгоритм Дейкстры).'
  },
  {
    id: 'dfs',
    title: 'Depth-First Search (DFS)',
    category: 'Algorithms',
    description: 'Поиск в глубину. Идеально для топологической сортировки и поиска циклов.',
    complexity: {
      time: 'O(V + E)',
      space: 'O(V)'
    },
    code: `def dfs(graph, vertex, visited=None):
    if visited is None:
        visited = set()
    visited.add(vertex)
    
    for neighbor in graph[vertex]:
        if neighbor not in visited:
            dfs(graph, neighbor, visited)
    return visited`,
    language: 'python',
    content: 'Идет "вглубь" графа до упора, затем возвращается (Backtracking). Реализуется через рекурсию (Call Stack) или явно через Стек (Stack).'
  },
  {
    id: 'dijkstra',
    title: "Dijkstra's Algorithm",
    category: 'Algorithms',
    description: 'Алгоритм Дейкстры: поиск кратчайшего пути от одной вершины ко всем остальным во взвешенном графе.',
    complexity: {
      time: 'O((V + E) log V)',
      space: 'O(V)'
    },
    code: `import heapq

def dijkstra(graph, start):
    distances = {node: float('inf') for node in graph}
    distances[start] = 0
    pq = [(0, start)]
    
    while pq:
        current_distance, current_node = heapq.heappop(pq)
        
        if current_distance > distances[current_node]:
            continue
            
        for neighbor, weight in graph[current_node].items():
            distance = current_distance + weight
            if distance < distances[neighbor]:
                distances[neighbor] = distance
                heapq.heappush(pq, (distance, neighbor))
                
    return distances`,
    language: 'python',
    content: 'Использует жадный подход и структуру данных мин-куча (Priority Queue). ВАЖНО: не работает с отрицательными весами ребер (для них нужен алгоритм Беллмана-Форда).'
  },
  {
    id: 'heap-sort',
    title: 'Heap Sort',
    category: 'Algorithms',
    description: 'Пирамидальная сортировка. Сортировка in-place на основе структуры данных "Куча" (Heap).',
    complexity: {
      best: 'O(n log n)',
      average: 'O(n log n)',
      worst: 'O(n log n)',
      time: 'O(n log n)',
      space: 'O(1)'
    },
    code: `# 1. Классический In-Place Heap Sort
def heapify(arr, n, i):
    largest = i
    l = 2 * i + 1
    r = 2 * i + 2
    if l < n and arr[l] > arr[largest]:
        largest = l
    if r < n and arr[r] > arr[largest]:
        largest = r
    if largest != i:
        arr[i], arr[largest] = arr[largest], arr[i]
        heapify(arr, n, largest)

def heap_sort(arr):
    n = len(arr)
    # Построение max-heap
    for i in range(n // 2 - 1, -1, -1):
        heapify(arr, n, i)
    # Извлечение элементов
    for i in range(n - 1, 0, -1):
        arr[i], arr[0] = arr[0], arr[i]
        heapify(arr, i, 0)
    return arr

# 2. Parallel Heap Sort (Чанкование + K-Way Merge)
from concurrent.futures import ProcessPoolExecutor
import heapq

def parallel_heap_sort(arr, num_workers=4):
    if len(arr) <= 1:
        return arr
        
    # Разбиваем массив на чанки
    chunk_size = max(1, len(arr) // num_workers)
    chunks = [arr[i:i + chunk_size] for i in range(0, len(arr), chunk_size)]
    
    # Сортируем каждый чанк параллельно через heap_sort (или любой Timsort)
    with ProcessPoolExecutor(max_workers=num_workers) as executor:
        sorted_chunks = list(executor.map(heap_sort, chunks))
        
    # Сливаем отсортированные чанки в один с помощью приоритетной очереди (k-way merge)
    return list(heapq.merge(*sorted_chunks))`,
    language: 'python',
    content: 'Создает max-heap из массива, затем извлекает максимальный элемент и ставит его в конец (in-place). Нестабильная сортировка, но гарантирует O(n log n) без дополнительной памяти O(n).\nПараллельная версия Heapsort не может эффективно распараллелить саму структуру (так как извлечение корня секвентально). Для этого применяют паттерн MapReduce: параллельная сортировка чанков (map) и последующее слияние k-отсортированных массивов через мин-кучу (reduce) за O(N log k).'
  },
  {
    id: 'hash-maps',
    title: 'Hash Maps',
    category: 'Data Structures',
    description: 'Структура данных "ключ-значение" с быстрым доступом.',
    complexity: {
      average: 'O(1)',
      worst: 'O(n) (при коллизиях)',
      time: 'O(1)',
      space: 'O(n)'
    },
    content: 'Реализует ассоциативный массив через хэш-функцию. Коллизии решаются методом цепочек или открытой адресацией.'
  },
  {
    id: 'cpython-memory-overhead',
    title: 'CPython Memory Overhead',
    category: 'Python Internals',
    description: 'Почему обычный int в Python весит 28 байт?',
    content: 'В CPython "всё есть объект". Каждый объект (наследующий структуру PyObject в C) обязательно содержит заголовок: ob_refcnt (счетчик ссылок, 8 байт на 64-битной системе) и ob_type (указатель на тип, 8 байт). Базовый int занимает дополнительно память под сами данные, итого 28 байт. Пустая строка — 49 байт. Из-за этого хранение примитивных типов в Python требует кратно больше памяти, чем массива int в C или Go. Для оптимизации используют массивы на базе с (например `array` или `numpy.ndarray`).'
  },
  {
    id: 'cpython-caching-interning',
    title: 'Small Int Caching & Interning',
    category: 'Python Internals',
    description: 'Оптимизации CPython для экономии памяти и избежания лишних аллокаций.',
    code: `a = 256; b = 256
print(a is b) # True

c = 257; d = 257
print(c is d) # False (в интерактивной консоли)

# String interning
s1 = "hello_world"
s2 = "hello_world"
print(s1 is s2) # True`,
    language: 'python',
    content: 'CPython кэширует целые числа от -5 до 256 при старте как синглтоны, чтобы ускорить работу. Поэтому важно понимать разницу между оператором `is` (сравнение адресов памяти) и `==` (сравнение значений). Также применяется Interning (интернирование) для коротких строк (состоящих из ASCII букв и цифр), поэтому переменные с такой строкой могут указывать на один и тот же участок памяти.'
  },
  {
    id: 'dict-implementation',
    title: 'Dictionary Under The Hood',
    category: 'Python Internals',
    description: 'Как устроены словари в Python 3.6+ и почему они сохраняют порядок.',
    comparison: {
      headers: ['Версия', 'Устройство памяти', 'Свойства'],
      rows: [
        ['До Python 3.6', 'Массив структур (hash, key, value)', 'Разреженный, много пустого места (over-allocation), не сохраняет порядок.'],
        ['Python 3.6+', 'Плотный массив (key, value) + Разреженный массив индексов (8/16/32 bit)', 'Сохраняет порядок вставки, экономнее на 20-25%.']
      ]
    },
    content: 'В старых версиях dict был большой хеш-таблицей, хранящей все 3 элемента напрямую, где всегда были пустые слоты (для уменьшения коллизий). Начиная с 3.6 используются два массива: один плотный (хранит вставки по порядку), а другой разреженный хранит только индексы из первого массива. Это радикально снизило потребление памяти.'
  },
  {
    id: 'list-vs-tuple-memory',
    title: 'List vs Tuple Memory Allocation',
    category: 'Python Internals',
    description: 'Внешнее отличие списка от кортежа понятно. А что под капотом?',
    comparison: {
      headers: ['Структура', 'Аллокация', 'Влияние на ОЗУ'],
      rows: [
        ['Tuple', 'Размер фиксируется при создании (static).', 'Пустой весит 40 байт. Меньше системных вызовов.'],
        ['List', 'Dynamic Array с Over-allocation.', 'Пустой весит 56 байт. Резервирует место (M + M>>3 + ...).']
      ]
    },
    content: 'Поскольку list должен обеспечивать O(1) амортизированное время для метода .append(), CPython выделяет память с запасом (over-allocation). Поэтому список из тех же трех элементов всегда будет занимать больше памяти, чем такой же tuple. Кортежи (Tuple) создаются ровно под выделенные значения (в Си - массив указателей + заголовок PyVarObject).'
  },
  {
    id: 'python-gc',
    title: 'Garbage Collection',
    category: 'Python Internals',
    description: 'Управление памятью в Python через Reference Counting и Generational GC.',
    content: 'CPython использует подсчет ссылок (ob_refcnt) как основной механизм. Если счетчик падает до нуля, объект удаляется немедленно. Но для поиска перекрестных (циклических) ссылок (когда A ссылается на B, а B на A) используется дополнительный Garbage Collector, работающий по 3 поколениям (Generations 0, 1, 2). GC сканирует только контейнерные объекты (list, dict, классы и т.д.).'
  },
  {
    id: 'python-descriptors',
    title: 'Descriptors Protocol',
    category: 'Python Internals',
    description: 'Магия, на которой построены @property, методы классов и ORM фреймворки (Django/SQLAlchemy).',
    code: `class IntegerField:
    def __init__(self, name):
        self.name = name

    def __get__(self, instance, owner):
        if instance is None:
            return self
        return instance.__dict__.get(self.name)

    def __set__(self, instance, value):
        if not isinstance(value, int):
            raise ValueError(f"{self.name} must be an integer")
        instance.__dict__[self.name] = value

class User:
    age = IntegerField('age')  # Это дескриптор данных (Data Descriptor)`,
    language: 'python',
    content: 'Дескриптор — это любой объект, определяющий методы __get__, __set__ или __delete__. Когда вы обращаетесь к атрибуту user.age, Python перехватывает этот вызов и вместо обычного поиска в __dict__ вызывает метод __get__ дескриптора. Это механизм уровня CPython, который позволяет инкапсулировать логику валидации, ленивых вычислений или доступа к БД прямо внутри обращения к атрибуту.'
  },
  {
    id: 'python-metaclasses',
    title: 'Metaclasses & __new__',
    category: 'Python Internals',
    description: 'Классы — это фабрики для создания экземпляров. Метаклассы — это фабрики для создания классов.',
    code: `class SingletonMeta(type):
    _instances = {}
    
    def __call__(cls, *args, **kwargs):
        # Метод __call__ метакласса вызывается при инстанцировании самого класса!
        if cls not in cls._instances:
            # Создаем экземпляр через type.__call__
            cls._instances[cls] = super().__call__(*args, **kwargs)
        return cls._instances[cls]

class Database(metaclass=SingletonMeta):
    pass
    
db1 = Database()
db2 = Database()
print(db1 is db2) # True`,
    language: 'python',
    content: 'В Python всё является объектом, даже сами классы (они являются экземплярами типа `type`). Метаклассы позволяют перехватить сам момент создания класса в памяти (когда сканируется его тело и методы). С помощью метаклассов пишут фреймворки типа Django ORM (когда объявление `class Model` автоматически генерирует SQL таблицы) или сложные паттерны (например, строгий Singleton).'
  },
  {
    id: 'python-mro',
    title: 'MRO (Method Resolution Order)',
    category: 'Python Internals',
    description: 'Алгоритм C3 Linearization, определяющий порядок поиска методов при множественном наследовании.',
    content: 'Когда класс наследуется от нескольких базовых классов (например `class D(B, C)`), Python должен понимать, из какого класса брать метод, если он есть и в B, и в C. Для этого используется алгоритм C3. Он гарантирует монотонность: базовый класс никогда не проверяется ДО его потомков, а порядок указания родителей при наследовании сохраняется (слева направо). Посмотреть MRO можно через атрибут `D.__mro__`.'
  },
  {
    id: 'python-concurrency-deepdive',
    title: 'Threading vs Asyncio vs Multiprocessing',
    category: 'Python Internals',
    description: 'Глубинная разница конкурентности и параллелизма в CPython: потоки, процессы и event loop.',
    comparison: {
      headers: ['Модель', 'GIL', 'Память и Оверхед', 'Use-Case'],
      rows: [
        ['Threading', '1 общий GIL на все потоки ОС', 'Общая память (Shared). Высок риск race-conditions. Оверхед ОС на переключения.', 'Сетевой / Дисковый I/O. Никакого профита для CPU-тасок (всё ждет GIL).'],
        ['Multiprocessing', 'Свой GIL в каждом процессе', 'Память изолирована (Copy-on-Write). Высший оверхед (Pickling) при передаче данных (IPC).', 'Тяжелые CPU задачи (математика, ML). Истинный параллелизм.'],
        ['Asyncio', 'GIL всегда залочен', '1 поток, 1 процесс (кооперативная многозадачность). Самое быстрое переключение.', 'Massive Network I/O (1000+ веб-сокетов).']
      ]
    },
    content: 'Парадокс GIL (Global Interpreter Lock) заключается в том, что Python-потоки (Threads) — это настоящие потоки ОС (POSIX threads). ОС честно раскидывает их по ядрам процессора, но GIL физически не дает двум потокам исполнять Python-байткод одновременно. Как итог потоки "дерутся" за GIL (thread thrashing), из-за чего многопоточный CPU-bound скрипт может работать МЕДЛЕННЕЕ однопоточного. \nAsyncio вообще не создает потоков. Это юзер-спейс Event Loop (событийный цикл), который просто перепрыгивает между корутинами в момент, когда те явно отдают управление через `await`. Состояние не шарится между ядрами, и переключение обходится в копейки.'
  },
  {
    id: 'python-rust-async',
    title: 'Rust (PyO3) + Asyncio + GIL',
    category: 'Python Internals',
    description: 'Что происходит с GIL, если запустить асинхронный Rust-код через PyO3 + Maturin?',
    code: `// Cargo.toml
// [dependencies]
// pyo3 = { version = "0.20", features = ["extension-module"] }
// pyo3-asyncio = { version = "0.20", features = ["tokio-runtime"] }
// tokio = { version = "1.0", features = ["full"] }

use pyo3::prelude::*;
use pyo3_asyncio::tokio::future_into_py;
use std::time::Duration;

#[pyfunction]
fn do_heavy_rust_work<'a>(py: Python<'a>) -> PyResult<&'a PyAny> {
    // future_into_py соединяет Python Asyncio & Rust Tokio
    future_into_py(py, async move {
        // --- GIL ЗДЕСЬ СВОБОДЕН! ---
        // Этот код исполняется в пуле потоков Rust Tokio.
        // Другие Python-корутины (или потоки) могут свободно работать!
        
        tokio::time::sleep(Duration::from_secs(5)).await;
        
        // Когда Rust-фьюча завершается, она на МИКРОСЕКУНДУ
        // перехватывает GIL, чтобы вернуть результат в Python Object.
        Ok(Python::with_gil(|py| "Rust 🦀 Async Done!".to_object(py)))
    })
}

#[pymodule]
fn my_rust_backend(_py: Python, m: &PyModule) -> PyResult<()> {
    m.add_function(wrap_pyfunction!(do_heavy_rust_work, m)?)?;
    Ok(())
}`,
    language: 'rust',
    content: 'Связка Rust (Maturin+PyO3) и Python творит магию. По умолчанию любое C/Rust расширение захватывает GIL при входе. Однако, когда мы используем `pyo3-asyncio`, происходит следующее:\n\n1. Rust функция вызывается из Python Event Loop.\n2. Rust превращает свой `Future` в Python `asyncio.Future` через абстракцию `future_into_py`.\n3. Самое главное: сам тяжелый асинхронный блок (всё что внутри `async move {...}`) отправляется выполняться на мощный пул потоков Rust-экосистемы (обычно Tokio Runtime).\n4. На время работы этого блока GIL ПОЛНОСТЬЮ ОТПУСКАЕТСЯ. Python Event Loop продолжает крутиться, принимая веб-запросы или дергая другие корутины.\n5. Только когда Rust-код посчитал математику/скачал файл, он дергает callback, на микросекунду захватывает GIL (чтобы сконструировать Python-объект `PyString`) и резолвит (resolves) Python-фьючу.\n\nИтог: Комбинируя Python Asyncio и Rust Tokio мы получаем истинный, безопасный мультипоточный параллелизм на CPU, полностью обходя проблемы GIL, при этом в Python-коде это выглядит как обычный прозрачный `await backend.do_heavy_rust_work()`.'
  },
  {
    id: 'cpython-gil-ceval',
    title: 'Hardcore: GIL & ceval.c',
    category: 'Python Internals',
    description: 'Настоящая имплементация контект-свитчинга GIL в исходниках CPython.',
    code: `/* Си-макросы в CPython (упрощенно) */

// Перед долгим I/O (например socket read)
Py_BEGIN_ALLOW_THREADS 
/* 
Разворачивается в:
PyThreadState *_save;
_save = PyEval_SaveThread(); // <-- Мьютекс GIL отпускается здесь!
*/

ssize_t bytes_read = read(fd, buffer, size); // ОС блокирует поток, Python бежит дальше

// После завершения I/O
Py_END_ALLOW_THREADS 
/*
Разворачивается в:
PyEval_RestoreThread(_save); // <-- Блокирующая попытка взять GIL обратно
*/`,
    language: 'c',
    content: 'Исполнение байткода происходит в огромном цикле switch-case внутри файла `ceval.c`. GIL — это физический мьютекс.\n\nВ Python 3 механизм переключения потоков базируется не на тиках (количестве инструкций), а на таймере.\nФункция `sys.setswitchinterval(...)` (по умолчанию 5 миллисекунд) определяет, как долго поток имеет право монопольно владеть GIL. \nКогда таймер истекает, виртуальная машина выставляет флаг `eval_breaker`. Текущий поток доходит до ближайшей границы инструкции, видит флаг и делает `drop_gil()`, уходя спать (condition variable wait). ОС будит другой поток, он делает `take_gil()` и бежит дальше.\n\nВажнейшее правило C-расширений (и стандартной библиотеки): перед ЛЮБЫМ блокирующим сисколлом (чтение файла, сокета, sleep) программист ОБЯЗАН вызвать макрос `Py_BEGIN_ALLOW_THREADS`. В этот момент поток отдает GIL и уходит ждать сеть. Все остальные потоки продолжают работать.'
  },
  {
    id: 'asyncio-epoll-internals',
    title: 'Hardcore: Asyncio = Epoll + Generators',
    category: 'Python Internals',
    description: 'Как Event Loop работает под капотом (без магии "async/await").',
    code: `# Как асинхронность выглядит на уровне ОС:
import selectors
import socket

# epoll (Linux) или kqueue (Mac)
sel = selectors.DefaultSelector()

def accept_conn(sock):
    conn, addr = sock.accept()
    conn.setblocking(False)
    # Регистрируем: ОС скажи мне, когда тут будут данные (EVENT_READ)
    sel.register(conn, selectors.EVENT_READ, read_data)

# ... Event Loop ...
while True:
    # Блокирующий сисколл ОС (epoll_wait)
    events = sel.select() 
    for key, mask in events:
        callback = key.data
        # Возвращаем управление корутине (часто через generator.send(result))
        callback(key.fileobj)`,
    language: 'python',
    content: 'Асинхронность — это иллюзия паралеллизма, собранная из двух компонентов:\n\n1. Состояние: Корутины (`async def`) внутри транслируются в генераторы (State Machines). У них есть собственное состояние (локальные переменные) и они могут заморозить свое выполнение (когда вы пишете `await`, внутри происходит `yield`).\n\n2. I/O Мультиплексирование: Event Loop использует системные вызовы ядра (epoll в Linux, kqueue в BSD/Mac, IOCP в Windows) для слежения за тысячами сетевых сокетов ОДНИМ потоком.\n\nЖизненный цикл:\nВы делаете `await aiohttp.get(...)`. Код доходит до неблокирующего(O_NONBLOCK) сокета. Если данных в сети пока нет, сокет возвращает `EAGAIN / EWOULDBLOCK`.\nТогда Event Loop просит ядро ОС: "пни меня, когда на дескрипторе сокета N появятся байты". \nСама корутина замораживается (yield). Event Loop берет следующую задачу из очереди и крутит её.\nКак только пакет пришел, `epoll_wait` сообщает об этом. Event loop берет замороженный генератор и делает ему `coro.send(data)`, оживляя корутину точно с того момента, где она уснула.'
  },
  {
    id: 'rust-pyo3-waker-zerocopy',
    title: 'Hardcore: PyO3 Wakers & Zero-Copy',
    category: 'Python Internals',
    description: 'Как связать два мира без глубокого копирования памяти и как Rust "будит" Python луп?',
    comparison: {
      headers: ['Подход', 'Затраты', 'Механизм'],
      rows: [
        ['Классика', 'Огромные (O(N))', 'Pickling (сериализация) объектов или побайтное копирование list/dict.'],
        ['Buffer Protocol (Zero-Copy)', 'O(1) микросекунды', 'Передача сырого C-указателя на память (PyBuffer). Numpy/Rust шарят общую память.']
      ]
    },
    content: '1. Проблема просыпания (Waker):\nДопустим, Rust-токен из пула Tokio закончил качать файл. Ему надо разбудить Python и передать туда данные. Но Tokio-тред не владеет GIL и не может трогать Python-объекты!\nПоэтому используется паттерн `loop.call_soon_threadsafe(callback)`. Rust берет указатель на Python Event Loop и кладет в его thread-safe очередь функцию замыкания. Когда главный Python-тред проснется, он достанет этот callback, захватит GIL и корректно зарезолвит `asyncio.Future`.\n\n2. Проблема памяти (Zero-Copy):\nЕсли мы в Rust посчитали матрицу на 2 Гигабайта, как вернуть ее в Python? Если переложить её в список — мы убьем CPU и ОЗУ и заблокируем GIL на секунды.\nВыручает Buffer Protocol. Rust может напрямую экспортировать сырой блок памяти в Python (оборачивая в `memoryview` или скормив Numpy напрямую). Таким образом, Python скрипт "смотрит" поверх Rust-памяти по указателю, не копируя ни единого байта. Так работает Pandas и Polars.'
  },
  {
    id: 'python-memory-pyobject',
    title: 'Hardcore: Указатели и структура PyObject',
    category: 'Python Internals',
    description: 'Переменные — это не "коробки" с данными, а ярлыки-указатели на С-структуры памяти.',
    code: `/* Include/object.h в исходниках CPython */
typedef struct _object {
    _PyObject_HEAD_EXTRA
    Py_ssize_t ob_refcnt;   // Счетчик ссылок
    PyTypeObject *ob_type;  // Указатель на тип данных (int, list, etc)
} PyObject;

# В Python:
a = [1, 2, 3] # Создается PyObject типа list. 'a' — просто указатель на него (PyObject* a)
b = a         # 'b' начинает указывать на ТУ ЖЕ ячейку памяти. Массив не копируется!
b.append(4)   # Изменился объект по указателю.
print(a)      # [1, 2, 3, 4]

# Функция id() в CPython возвращает именно адрес PyObject в RAM C-машины
print(hex(id(a))) # 0x7f4b8f0a1dc0`,
    language: 'python',
    content: 'Когда в C вы пишете `int x = 5`, вы создаете физическую ячейку памяти (коробку), куда кладете число. Когда в Python вы пишете `x = 5`, вы создаете в куче огромную C-структуру `PyObject` (включающую счетчик ссылок и указатель на тип), а затем просто "привязываете" имя строковое имя `x` к этому объекту в специальном словаре локальных переменных (на уровне C это указатель). \n\nПоэтому передачи по ссылке или по значению в чистом виде в Питоне нет. Это называется "Pass-by-assignment" (передача по связыванию). Если вы передаете список в функцию, вы передаете указатель. Если вы делаете `.append()`, вы мутируете (изменяете) оригинальный `PyObject` в памяти. Но если вы пишете внутри функции `lst = [1, 2]`, вы просто перенаправляете локальное имя-указатель на НОВЫЙ `PyObject`, оставляя оригинал нетронутым.'
  },
  {
    id: 'python-garbage-collection',
    title: 'Hardcore: Garbage Collector & Cycles',
    category: 'Python Internals',
    description: 'Как Python чистит память? Reference Counting и циклические ссылки.',
    code: `import sys
import gc

a = []
print(sys.getrefcount(a)) # 2 (одна из них — сама переменная a, вторая — передача в функцию getrefcount)

b = a
print(sys.getrefcount(a)) # 3

# Циклическая ссылка (Reference Cycle)
lst = []
lst.append(lst) # Список ссылается сам на себя!

del lst # Мы удалили имя lst (понизили счетчик на 1)
# НО! Внутри списка всё еще лежит указатель на этот же список. 
# ob_refcnt никогда не станет = 0. Утечка памяти (memory leak)?

# Нет, спасет циклический GC:
gc.collect() # Принудительно запускаем чистильщика`,
    language: 'python',
    content: 'Главный механизм управления памятью в CPython — это Reference Counting (Счетчик ссылок). У каждого `PyObject` есть поле `ob_refcnt`. Когда вы создаете переменную `a = [1]`, `ob_refcnt` = 1. Когда делаете `b = a`, `ob_refcnt` становится 2. Если счетчик падает до нуля, память очищается МГНОВЕННО.\n\nПроблема: Циклические ссылки. Если объект `A` ссылается на `B`, а `B` на `A`, их счетчики никогда не станут нулевыми, даже если программа забудет про них. \n\nРешение: Фоновый Циклический GC. Python периодически сканирует все "контейнерные" объекты (списки, словари, инстансы классов, так как строки и числа не могут ни на кого ссылаться). GC использует алгоритм 3 поколений (Generational GC). Если объекты переживают очистку, они перемещаются в старшие поколения, которые проверяются всё реже, экономя CPU.'
  },
  {
    id: 'python-interning',
    title: 'Hardcore: Interning & Small Ints',
    category: 'Python Internals',
    description: 'Зачем Python кэширует маленькие числа и строки? Оптимизация памяти.',
    code: `a = 256
b = 256
print(a is b) # True (указывают на один и тот же PyObject в памяти)

a = 257
b = 257
print(a is b) # False (объекты с одинаковым значением, но РАЗНЫЕ адреса)
# В REPL будет False. (P.S. Внутри одного .py файла компилятор оптимизирует и отдаст True)

# Интернирование строк
s1 = "hello_world"
s2 = "hello_world"
print(s1 is s2) # True (Python заинтернировал строку-идентификатор)

s3 = "hello world!" # содержит пробел и спецсимвол
s4 = "hello world!"
print(s3 is s4) # Скорее всего False (не подпадает под авто-интернирование)`,
    language: 'python',
    content: 'Создание новых C-структур `PyObject` — тяжелая операция (запросы malloc к операционной системе). Чтобы ускорить работу, CPython использует предварительное кэширование (Interning).\n\n1. Массив Small Integers:\nПри запуске интерпретатора Python АВТОМАТИЧЕСКИ создает массив объектов-чисел от -5 до 256. Почему? Потому что это самые популярные индексы в циклах! Когда вы пишете `a = 25`, Python не выделяет память, он просто дает вам указатель на 30-й элемент своего глобального массива.\n\n2. String Interning:\nPython также кэширует маленькие строки, которые выглядят как Идентификаторы (состоят из букв, цифр и `_`). Зачем? Ключи в словарях (dict keys) в Python — это в основном строки (названия атрибутов объектов). Благодаря интернированию, Python может сравнивать ключи в словаре не через посимвольный обход O(N), а за O(1) просто сверяя C-указатели памяти (`a is b`, на уровне C это просто `ptr_a == ptr_b`).'
  },
  {
    id: 'cap-theorem',
    title: 'CAP Theorem',
    category: 'System Design',
    description: 'Теорема о фундаментальных ограничениях распределенных систем.',
    comparison: {
      headers: ['Свойство', 'Описание'],
      rows: [
        ['Consistency', 'Все узлы видят одни и те же данные'],
        ['Availability', 'Запросы получают ответ даже при сбоях'],
        ['Partition Tolerance', 'Система работает при разрыве связи']
      ]
    },
    content: 'В распределенной системе можно гарантировать только 2 из 3 свойств одновременно.'
  },
  {
    id: 'load-balancing',
    title: 'Load Balancing',
    category: 'System Design',
    description: 'Распределение трафика между серверами.',
    comparison: {
      headers: ['Алгоритм', 'Принцип работы'],
      rows: [
        ['Round Robin', 'По циклу'],
        ['Least Connections', 'Туда, где меньше активных сессий'],
        ['IP Hash', 'Привязка клиента к серверу по IP']
      ]
    },
    content: 'Балансировщики бывают L4 (Транспортный уровень) и L7 (Прикладной уровень, HTTP headers/cookies).'
  },
  
  // --- PYDANTIC ---
  {
    id: 'pydantic-validators',
    title: 'Validators (@field_validator / @model_validator)',
    category: 'Pydantic',
    description: 'Мощный механизм валидации и трансформации данных на уровне моделей.',
    code: `from pydantic import BaseModel, field_validator, model_validator

class UserCreate(BaseModel):
    username: str
    password: str
    password_confirm: str

    @field_validator('username')
    @classmethod
    def username_alphanumeric(cls, v: str):
        if not v.isalnum():
            raise ValueError('Must be alphanumeric')
        return v.lower() # Трансформация "на лету"

    @model_validator(mode='after')
    def check_passwords_match(self):
        # mode='after' значит, что все поля уже прошли field_validators
        if self.password != self.password_confirm:
            raise ValueError('Passwords do not match')
        return self`,
    language: 'python',
    content: 'Pydantic v2 предлагает два основных уровня валидации. @field_validator работает на уровне конкретных полей (трансформирует данные или выбрасывает ValueError). @model_validator(mode="before" или "after") имеет доступ ко ВСЕМ полям модели одновременно (self / cls), что идеально для кросс-полевой валидации (например, пароль и подтверждение).'
  },
  {
    id: 'pydantic-inheritance-order',
    title: 'Inheritance Order',
    category: 'Pydantic',
    description: 'Что происходит с полями при наследовании моделей?',
    code: `from pydantic import BaseModel

class BaseUser(BaseModel):
    id: int
    name: str = "Unknown"

class Admin(BaseUser):
    role: str
    name: str  # Переопределение (Shadowing) родительского поля!

# Порядок полей в Admin:
# 1. id
# 2. name
# 3. role`,
    language: 'python',
    content: 'В Pydantic (особенно это было критично в v1 при передаче позиционных аргументов) порядок объявления полей диктует их порядок в `__init__`. При наследовании (Inheritance) действует алгоритм: СНАЧАЛА располагаются поля родительского класса, ЗАТЕМ — поля дочернего. Если дочерний класс переопределяет (Shadows) родительское поле, оно сохраняет свою родительскую позицию, но меняет логику/аннотацию (например, делает его обязательным или меняет тип).'
  },
  {
    id: 'pydantic-metaclasses',
    title: 'Core Internals (Metaclasses vs v2 Schema)',
    category: 'Pydantic',
    description: 'Как Pydantic собирает схему и почему v2 стал сильно быстрее.',
    content: 'До версии 2.0 Pydantic сильно полагался на метаклассы (ModelMetaclass в Python). В момент загрузки кода метакласс перехватывал аннотации (hints), собирал их в `__fields__` и перегружал поведение `__setattr__`. В Pydantic v2 (начиная с 2023) архитектуру переписали. Метаклассы всё ещё используются для оборачивания классов (перехвата инстанцирования), но сборка схемы перенесена на `__init_subclass__` и, главное, на pydantic-core (написано на Rust). Генерируется внутреннее дерево валидаторов — `__pydantic_core_schema__`, которое исполняется на стороне Rust, радикально снижая накладные расходы интерпретатора.'
  },
  
  // --- DOCKER & KUBERNETES ---
  {
    id: 'docker-internals',
    title: 'Docker Internals (Under the hood)',
    category: 'Docker & K8s',
    description: 'Как работают контейнеры на уровне ядра Linux и в чем отличие от виртуальных машин (VM)?',
    comparison: {
      headers: ['Свойство', 'Виртуальная машина (VM)', 'Docker Контейнер'],
      rows: [
        ['Архитектура', 'Свое ядро ОС напрямую (Guest OS) над гипервизором', 'Общее ядро хоста (Host OS)'],
        ['Скорость старта', 'Минуты (загрузка ядра Linux/Windows)', 'Миллисекунды (просто spawn процесса)'],
        ['Изоляция', '100% строгая, аппаратная', 'Логическая (на уровне Cgroups OS)']
      ]
    },
    content: 'Докер — это не виртуализация, а просто изолированный процесс в Linux. Изоляция достигается за счет 3 главных механизмов ядра Linux:\n\n1. Namespaces (Пространства имен): Изолируют "видимость" ресурсов. Существуют PID space (контейнер думает, что он PID=1), Network (свой localhost и IP), Mount и IPC. \n2. Cgroups (Control Groups): Ограничивают "железо". Следят, чтобы контейнер не съел больше выделенного RAM, CPU или Disk I/O. Если попытается — ядро убьет процесс (OOM Killer). \n3. UnionFS (например Overlay2): Слоистая файловая система, благодаря которой мы можем переиспользовать базовые слои (например ubuntu:latest) между сотней разных образов, экономя дисковое пространство.'
  },
  {
    id: 'cgroups-deep-dive',
    title: 'Cgroups Deep Dive & K8s Limits',
    category: 'Docker & K8s',
    description: 'Как ядро Linux физически ограничивает потребление CPU и памяти, и как это транслируется в Kubernetes.',
    code: `# Cgroups интерфейс доступен через виртуальную файловую систему sysfs
$ ls -l /sys/fs/cgroup/memory/docker/<container_id>/

# Посмотреть текущий лимит памяти для контейнера (в байтах)
$ cat /sys/fs/cgroup/memory/docker/<container_id>/memory.limit_in_bytes
536870912 # Равно 512 MB

# Если процесс превысит этот лимит, в dmesg (системных логах ядра) появится:
# "Out of memory: Killed process 1234 (python)"

# Настройка CPU лимитов через планировщик CFS (Completely Fair Scheduler)
# Квота и период (если квота половина периода = 0.5 CPU)
$ cat /sys/fs/cgroup/cpu/docker/<container_id>/cpu.cfs_period_us
100000 
$ cat /sys/fs/cgroup/cpu/docker/<container_id>/cpu.cfs_quota_us
50000 `,
    language: 'bash',
    content: 'Понятия Requests и Limits в Kubernetes напрямую управляют механизмами ядра ОС.\n\nMemory (Память):\nПамять не сжимается (incompressible resource). Если K8s Pod (и внутренние процессы) превысит выделенный ему лимит памяти, ядро Linux мгновенно вызывает агрессивный механизм OOM Killer (Out-Of-Memory Killer), который пошлет процессу сигнал SIGKILL. Контейнер аварийно завершится (OOMKilled status).\n\nCPU (Процессор):\nCPU — это сжимаемый ресурс (compressible). Лимитирование работает на базе квот планировщика задач CFS. Если контейнер пытается использовать больше CPU, чем ему разрешено (limits.cpu), ядро его НЕ убивает. Оно применяет CPU Throttling (Троттлинг): искусственно тормозит процесс, отнимая у него процессорные такты, пока не начнется следующий период.\n\nДругие контроллеры (Subsystems):\nКроме CPU и RAM, Cgroups позволяют ограничивать скорость чтения/записи на диск (Blkio), а также максимальное количество порождаемых процессов — защиту от Fork-бомб (PIDs controller).'
  },
  {
    id: 'pid-namespaces-hierarchy',
    title: 'PID Namespaces & Limit Hierarchy',
    category: 'Docker & K8s',
    description: 'Магия PID 1: как соотносятся родительские и дочерние процессы, и как на них действуют лимиты?',
    code: `# Внутри контейнера:
$ ps aux
PID   USER     TIME  COMMAND
  1   root      0:00 python app.py
  15  root      0:00 python worker.py # дочерний процесс
  
# На Хост-машине (Host OS):
$ ps aux | grep python
PID     USER    TIME  COMMAND
14352   root     0:00 python app.py
14389   root     0:00 python worker.py

# Иерархия (cgroups limit tree)
# Лимит на контейнер = 512MB. 
# Сумма (app.py + worker.py + sys_overhead) <= 512MB. 
# Иначе OOM Killer убьет "самого жирного" по score.`,
    language: 'bash',
    content: 'PID Namespace создает иллюзию: первый процесс внутри контейнера искренне считает себя "царем" системы с PID=1 (init-процессом). Но с точки зрения ядра (Host OS), это просто обычный процесс (например, PID 14352), запущенный демоном containerd/dockerd.\n\nНаследование лимитов (Cgroups Hierarchy):\nCgroups имеют строгую древовидную иерархию. Когда процесс (наш PID 1) делает `fork()` и создает дочерниe процессы (например, воркеры gunicorn/celery), они АВТОМАТИЧЕСКИ помещаются в ту же cgroup. Лимиты применяются к ГРУППЕ в целом. Суммарное потребление родителя и всех его детей не может превышать лимит K8s Poda. Избежать лимита "сбежав" через форк невозможно.\n\nПроблема PID 1 (Zombie Reaping):\nЯдро Linux ожидает, что процесс с PID 1 будет забирать коды возврата у "сирот" и зачищать "зомби-процессы". Если ваше приложение (например Node.js или Java) работает как PID 1 и порождает под-процессы, оно может не уметь убирать за ними. Зомби заполнят таблицу процессов (упершись в pids.max cgroup) и контейнер упадет. Поэтому в Dockerfile часто используют ENTRYPOINT ["tini", "--", "python", "app.py"] — легковесный микро-init.'
  },
  {
    id: 'kubernetes-architecture',
    title: 'K8s Cluster Architecture',
    category: 'Docker & K8s',
    description: 'Из каких базовых компонентов состоит любой Kubernetes кластер?',
    content: 'Kubernetes разделен на два огромных блока: Control Plane (Мастер-узлы) и Data Plane (Worker-узлы).\n\nControl Plane (Мозг):\n* kube-apiserver: Точка входа в кластер. Принимает REST команды, валидирует их.\n* etcd: Key-Value хранилище (база данных кластера). Единственный stateful компонент Control Plane.\n* kube-scheduler: Ищет оптимальную ноду для запуска новых Pod\'ов.\n* kube-controller-manager: Следит за состоянием (сверяет желаемое из etcd с действительным, например, чтобы всегда было 3 реплики приложения).\n\nWorker Nodes (Рабочие лошадки):\n* kubelet: Агент на каждой ноде, который следит за тем, что контейнеры запущены и живы.\n* kube-proxy: Поддерживает сетевые правила (через iptables или ipvs), чтобы трафик достигал нужных подов.\n* Container Runtime (например containerd): Фактически запускает саму контейнерную среду (пуллит образы, стартует изолированные процессы).'
  },
  {
    id: 'kubernetes-networking',
    title: 'K8s Networking Model & CNI',
    category: 'Docker & K8s',
    description: 'Почему поды в Kubernetes могут легко общаться друг с другом? Как работают Services?',
    content: 'Одно из главных отличий K8s от простого Docker — это плоская сетевая модель. Основные правила:\n1. Каждый Pod получает свой уникальный, реальный (внутренний) IP-адрес.\n2. Контейнеры внутри одного пода разделяют один Network Namespace. То есть они могут общаться друг с другом просто по `localhost:port`.\n3. Все поды в кластере могут стучаться к другим подам без NAT трансляции.\n\nЗа реализацию этой логики отвечают сторонние плагины CNI (Container Network Interface), такие как Flannel или Calico. Они создают Overlay Network (оверлейную или виртуальную сеть) поверх физических серверов.\n\nТак как поды смертны и их IP-адреса постоянно меняются при рестартах, K8s использует сущность Service. Service дает стабильный IP и DNS имя, а kube-proxy распределяет трафик (Load Balancing) на все живые поды, скрывающиеся за этим сервисом.'
  },
  {
    id: 'k8s-workloads-deployments',
    title: 'Workloads: Pods, Deployments & Rollouts',
    category: 'Docker & K8s',
    description: 'Базовые примитивы Kubernetes: от пространства имен до Zero-Downtime деплоя.',
    code: `apiVersion: apps/v1
kind: Deployment
metadata:
  name: my-backend
  namespace: prod # Виртуальная логическая граница
spec:
  replicas: 3 # Гарантируем, что всегда живо 3 пода
  strategy:
    type: RollingUpdate
    rollingUpdate:
      maxSurge: 1       # Разрешаем временно создать 4-й под при обнове
      maxUnavailable: 0 # Требуем, чтобы минимум 3 пода всегда отвечали
  template:
    metadata:
      labels:
        app: my-backend
    spec:
      containers:
      - name: app
        image: my-app:v2.0.0
        # ...

# Команда для принудительного мягкого рестарта подов:
# kubectl rollout restart deployment my-backend -n prod`,
    language: 'yaml',
    content: 'Kubernetes работает с состояниями декларативно (вы описываете, "как должно быть", а контроллеры делают это реальностью).\n\nNamespaces (ns): Логическое разделение кластера (например, prod, dev, monitoring). Позволяет разделять доступы (RBAC) и квоты ресурсов между командами.\n\nPods (Поды): Мельчайшая атомарная единица. K8s управляет не контейнерами, а подами. Поды смертны (ephemeral). Упал — удаляется навсегда, вместо него поднимается новый с новым IP.\n\nReplicaSets & Replicas: Контроллер, гарантирующий запуск ровно N экземпляров (реплик) пода. Если нода с подом сгорит, ReplicaSet это заметит и создаст новый под на другой ноде.\n\nDeployments: Главная абстракция для Web-сервисов. Это "умная" обертка над ReplicaSet. Деплоймент позволяет обновлять версии приложения (менять image tag) без даунтайма (Zero-Downtime Deployment).\n\nЗа это отвечает механика RollingUpdate (maxSurge и maxUnavailable). При обновлении версии Deployment медленно "гасит" старые поды и поднимает новые, следя за тем, чтобы сервис не прекращал отвечать юзерам. Если нужно просто перезагрузить приложение, чтобы оно подтянуло новые конфиги (без смены версии), используют команду `kubectl rollout restart`. Она запускает этот же плавный процесс рестарта без изменения манифеста.'
  },
  {
    id: 'k8s-services',
    title: 'Services: ClusterIP vs NodePort vs LB',
    category: 'Docker & K8s',
    description: 'Как поды находят друг друга, если их IP-адреса постоянно меняются?',
    comparison: {
      headers: ['Тип Service', 'Доступность', 'Юзкейс'],
      rows: [
        ['ClusterIP', 'Только внутри кластера', 'База данных, внутренний микросервис'],
        ['NodePort', 'Снаружи, через IP любой Node : Port', 'Дебаг или интеграция с устаревшим железом'],
        ['LoadBalancer', 'Внешний IP облачного провайдера', 'Точка входа для публичного трафика (L4)']
      ]
    },
    content: 'Service — это L4 (TCP/UDP) балансировщик и Registry. Когда вы создаете Service, он получает статический IP и DNS-имя в кластере (например, `my-db.prod.svc.cluster.local`).\nService использует селекторы (labels), чтобы находить поды. Даже если под умрет и поднимется с новым IP, Service (через iptables/ipvs) автоматически обновит свои эндпоинты и трафик продолжит идти к живому поду.'
  },
  {
    id: 'k8s-services-detailed',
    title: 'Services Deep Dive & TCP Ingress',
    category: 'Docker & K8s',
    description: 'Матрешка сервисов K8s: от внутреннего IP до внешнего облачного балансировщика, и как прокинуть TCP наружу.',
    code: `# Прокидываем TCP/UDP трафик через Nginx Ingress (ConfigMap)
apiVersion: v1
kind: ConfigMap
metadata:
  name: tcp-services
  namespace: ingress-nginx
data:
  # внешний порт Ingress : внутренний namespace/сервис:порт
  "5432": "prod/postgres-db:5432"
  "6379": "prod/redis-cluster:6379"

---
# Альтернатива: Traefik IngressRouteTCP (SNI маршрутизация)
apiVersion: traefik.io/v1alpha1
kind: IngressRouteTCP
metadata:
  name: mongo-route
spec:
  entryPoints: [ "mongo" ]
  routes:
  - match: HostSNI('mongo.myapp.com') # TCP маршрутизация по домену (только с TLS)
    services:
      - name: mongo-service
        port: 27017`,
    language: 'yaml',
    content: 'Сетевые абстракции Kubernetes работают по принципу "Матрешки":\n1. ClusterIP (База): Создает виртуальный IP (VIP). Трафик маршрутизируется ТОЛЬКО внутри кластера.\n2. NodePort (Оболочка над ClusterIP): Физически открывает порт (обычно 30000-32767) на каждом Worker-узле. Трафик, приходящий на этот порт ноды, автоматически идет в ClusterIP сервиса.\n3. LoadBalancer (Оболочка над NodePort): Делает API вызов в облако (GCP/AWS). Облако создает железный или виртуальный внешний L4 балансировщик (например, AWS Network Load Balancer), который направляет трафик на NodePorts всех живых воркеров.\n\nЗачем нужен Ingress TCP (ingresstcp)?\nГлавный минус Type: LoadBalancer — это цена. 1 сервис = 1 выделенный IP = $ в месяц. HTTP(S) трафик легко собрать на одном Ingress-контроллере (через домены).\nНо что, если вам нужно снаружи подключиться к базе данных по TCP (например к Postgres на порту 5432)?\n\nВместо создания отдельного LoadBalancer для БД, мы используем TCP-туннелирование внутри Ingress Controller\'а:\n* NGINX Ingress: Решается "в лоб" через `ConfigMap tcp-services`. Nginx открывает порт 5432 и напрямую проксирует TCP-поток в внутренний ClusterIP Postgres-сервиса.\n* Traefik: умеет делать умный TCP роутинг. Используя абстракцию `IngressRouteTCP`, он может анализировать TLS рукопожатие (SNI - Server Name Indication) и маршрутизировать чистый TCP трафик по доменному имени, позволяя вешать разные базы данных на один TCP порт под разными доменами!'
  },
  {
    id: 'k8s-ingress',
    title: 'Ingress: Nginx vs Traefik',
    category: 'Docker & K8s',
    description: 'Маршрутизация HTTP/HTTPS (L7) трафика в кластер. В чем отличие Ingress от Service?',
    content: 'Если Service — это глупый TCP/UDP балансировщик (L4), то Ingress — это умный HTTP-роутер (L7). Ingress умеет смотреть на доменное имя (Host), URL путь (Path) и HTTP-заголовки, чтобы решать, какому Service отдать трафик.\n\nIngress состоит из двух сущностей:\n1. Ingress Resource: YAML-файл, где мы описываем правила (если host == api.app.com -> иди в backend-svc).\n2. Ingress Controller: Реальный Reverse Proxy (Pod), который читает эти правила. Самые популярные — NGINX Ingress и Traefik.\n\nNginx vs Traefik:\n* ingress-nginx (на базе NGINX) — классика. Конфигурируется через аннотации. При добавлении новых правил может требовать легкого перезапуска воркеров (reload).\n* Traefik — современный облачно-ориентированный роутер (написан на Go). Знает про K8s из коробки, поддерживает динамическую конфигурацию без релоадов. Часто вместо стандартного Ingress использует свои мощные CRD (например `IngressRoute` и `Middleware`), что делает его гибче.'
  },
  {
    id: 'k8s-cert-manager',
    title: 'Cert-Manager & ClusterIssuer',
    category: 'Docker & K8s',
    description: 'Автоматизация SSL/TLS сертификатов (Let\'s Encrypt) в кластере.',
    code: `apiVersion: cert-manager.io/v1
kind: ClusterIssuer
metadata:
  name: letsencrypt-prod
spec:
  acme:
    server: https://acme-v02...
    email: admin@app.com
    privateKeySecretRef:
      name: letsencrypt-prod
    solvers:
    - http01: # HTTP-01 Challenge
        ingress:
          class: nginx`,
    language: 'yaml',
    content: 'Вместо того чтобы вручную покупать и обновлять сертификаты, в Kubernetes ставят оператор `cert-manager`.\n\nЦентральным элементом является конфигурация Issuer:\n* Issuer — выписывает сертификаты только внутри одного Namespace.\n* ClusterIssuer — доступен глобально всем неймспейсам в кластере.\n\nКак это работает (ACME HTTP-01 Challenge)?\n1. Вы создаете Ingress и добавляете аннотацию `cert-manager.io/cluster-issuer: letsencrypt-prod`.\n2. cert-manager замечает это и делает запрос к Let\'s Encrypt.\n3. Let\'s Encrypt просит доказать владение доменом. cert-manager временно поднимает маленький Pod в вашем кластере и специальный Ingress-рут (`/.well-known/acme-challenge`).\n4. Let\'s Encrypt проверяет этот рут по HTTP.\n5. Если успешно — cert-manager скачивает сертификат, кладет его в K8s Secret, а ваш Ingress Controller начинает терминировать HTTPS трафик.'
  },
  {
    id: 'k8s-pvc-pv',
    title: 'Persistent Storage: PV, PVC, SC',
    category: 'Docker & K8s',
    description: 'Где хранить базу данных, если поды постоянно удаляются и создаются заново?',
    comparison: {
      headers: ['Концепт', 'Что это?', 'Аналогия'],
      rows: [
        ['StorageClass (SC)', 'Фабрика дисков (SSD, HDD, EBS в AWS)', 'Завод по производству дисков'],
        ['PersistentVolume (PV)', 'Сам физический или сетевой диск (например AWS EBS)', 'Сам жесткий диск'],
        ['PersistentVolumeClaim (PVC)', 'Заявка пода на кусок диска (например "Дайте мне 10Gb")', 'Талончик на диск']
      ]
    },
    content: 'Поды смертны, поэтому локальная файловая система внутри контейнера очищается при его рестарте. Для хранения стейта (базы данных, загруженные картинки) нужны тома (Volumes).\n\nЗапрашивание диска работает так:\n1. Приложение не знает про "железо". В YAML деплоймента вы пишете PersistentVolumeClaim (PVC): "Мне нужен диск на 10 Гигабайт, режим ReadWriteOnce (чтобы никто другой не мог писать туда одновременно)".\n2. K8s ищет свободный PersistentVolume (PV), подходящий под запрос.\n3. Если свободного нет, используется механизм Dynamic Provisioning — K8s смотрит на StorageClass, идет по API в облако (GCP/AWS/Yandex) или к вашей локальной СХД, просит создать жесткий диск на 10Gb, монтирует его к ноде, а затем к вашему Поду.\nДаже если под умрет, диск (PV) останется в безопасности, и новый под примонтирует его снова.'
  }
];
