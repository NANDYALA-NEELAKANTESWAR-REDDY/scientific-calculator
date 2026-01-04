import tkinter as tk
import math
root = tk.Tk()
root.title("Scientific Calculator")
root.geometry("360x520")
root.resizable(False, False)
expression = ""
display = tk.StringVar()

entry = tk.Entry(root, textvariable=display, font=("Arial", 20), bd=10, relief="sunken", justify="right")
entry.pack(fill="both", padx=10, pady=10, ipady=10)
def press(num):
    global expression
    expression += str(num)
    display.set(expression)
def clear():
    global expression
    expression = ""
    display.set("")

def calculate():
    global expression
    try:
        result = str(eval(expression))
        display.set(result)
        expression = result
    except:
        display.set("Error")
        expression = ""
def sci(func):
    global expression
    try:
        value = float(expression)

        if func == "sin":
            expression = str(math.sin(math.radians(value)))
        elif func == "cos":
            expression = str(math.cos(math.radians(value)))
        elif func == "tan":
            expression = str(math.tan(math.radians(value)))
        elif func == "sqrt":
            expression = str(math.sqrt(value))
        elif func == "log":
            expression = str(math.log10(value))
        elif func == "ln":
            expression = str(math.log(value))

        display.set(expression)

    except:
        display.set("Error")
        expression = ""
frame = tk.Frame(root)
frame.pack()
buttons = [
    ("sin", lambda: sci("sin")), ("cos", lambda: sci("cos")), ("tan", lambda: sci("tan")), ("√", lambda: sci("sqrt")),
    ("log", lambda: sci("log")), ("ln", lambda: sci("ln")),  ("C", clear),                 ("/", lambda: press("/")),
    ("7", lambda: press(7)), ("8", lambda: press(8)), ("9", lambda: press(9)), ("*", lambda: press("*")),
    ("4", lambda: press(4)), ("5", lambda: press(5)), ("6", lambda: press(6)), ("-", lambda: press("-")),
    ("1", lambda: press(1)), ("2", lambda: press(2)), ("3", lambda: press(3)), ("+", lambda: press("+")),
    ("0", lambda: press(0)), (".", lambda: press(".")), ("=", calculate)
]
row = 0
col = 0

for text, command in buttons:
    tk.Button(frame, text=text, command=command, width=8, height=2).grid(row=row, column=col, padx=5, pady=5)
    col += 1
    if col == 4:
        col = 0
        row += 1
root.mainloop()
