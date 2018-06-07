pi = 0.0
for i in range(0,10):
    new = (-1)**i / (2*i + 1)
    pi += new
    print(new)

print(4 * pi)
